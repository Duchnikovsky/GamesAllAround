import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

export interface Session {
  authenticated: boolean;
  id: string;
  email: string;
  role: "ROLE" | "MODERATOR" | "ADMIN" | undefined;
}

async function fetchSessionState(): Promise<Session> {
  try {
    const url = `${import.meta.env.VITE_SERVER_URL}/auth/getAuth`;
    const { data } = await axios.get(url, {
      withCredentials: true,
    });
    return data as Session;
  } catch (error) {
    return {
      authenticated: false,
      email: "",
      id: "",
      role: undefined,
    };
  }
}

function useSession() {
  const [session, setSession] = useState<Session>({
    authenticated: false,
    email: "",
    id: "",
    role: undefined,
  });
  const [isLoading, setIsLoading] = useState(true);

  const { refetch, data } = useQuery<Session>({
    queryKey: ["session"],
    queryFn: fetchSessionState,
    enabled: false,
    retry: false,
  });

  useEffect(() => {
    refetch();
    if (data) {
      setSession(data);
      setIsLoading(false);
    }
  }, [data]);

  return { session, isLoading, refetch };
}

export default useSession;
