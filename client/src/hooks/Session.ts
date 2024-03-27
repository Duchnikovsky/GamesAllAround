import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

interface Session {
  authenticated: boolean;
  user: {
    id: string;
    email: string;
  };
  token: string;
}

async function fetchSessionState(): Promise<Session> {
  const url = `${import.meta.env.VITE_SERVER_URL}/auth/getAuth`;
  const { data } = await axios.get(url, {
    withCredentials: true,
  });
  return data as Session;
}

function useSession() {
  const [session, setSession] = useState<Session>(
    {
      authenticated: false,
      user: {
        id: "",
        email: "",
      },
      token: "",
    }
  );
  const [isLoading, setIsLoading] = useState(true);

  const { refetch, data } = useQuery<Session>({
    queryKey: ["session"],
    queryFn: fetchSessionState,
    enabled: false,
    retry: false,
  });

  console.log(data);

  useEffect(() => {
    refetch();
    if (data) {
      setSession(data);
      setIsLoading(false);
    }
  }, [data]);

  return { session, isLoading };
}

export default useSession;
