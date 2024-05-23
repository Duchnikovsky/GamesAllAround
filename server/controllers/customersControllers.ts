import { Request, Response } from "express";
import { getAuthSession } from "./authControllers";
import { z } from "zod";
import {
  deleteCustomerById,
  deleteCustomersById,
  getCustomerById,
  getCustomersByValue,
  updateCustomerById,
} from "../models/customersModels";
import { customerUpdateSchema } from "../utils/customersUtils";

export async function getCustomers(req: Request, res: Response) {
  const body = req.query;
  try {
    const session = await getAuthSession(req);

    if (!session || session.role !== "ADMIN")
      return res.status(401).send("You aren't authorized to fetch this data");

    const { value } = z
      .object({
        value: z.string(),
      })
      .parse({
        value: body.value,
      });

    const customers = await getCustomersByValue(value);

    return res.status(200).send(customers);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).send(error.errors[0].message);
    }
    return res.status(500).send("Could not fetch customers, try again later");
  }
}

export async function getCustomer(req: Request, res: Response) {
  const body = req.query;
  try {
    const session = await getAuthSession(req);

    if (!session || session.role !== "ADMIN")
      return res.status(401).send("You aren't authorized to fetch this data");

    const { customerId } = z
      .object({
        customerId: z.string().min(1, "Customer id must be provided"),
      })
      .parse({
        customerId: body.customerId,
      });

    const customers = await getCustomerById(customerId);

    return res.status(200).send(customers);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).send(error.errors[0].message);
    }
    return res.status(500).send("Could not fetch customers, try again later");
  }
}

export async function deleteCustomer(req: Request, res: Response) {
  const body = await req.body;
  try {
    const session = await getAuthSession(req);

    if (!session || session.role !== "ADMIN")
      return res.status(401).send("You aren't authorized to delete this data");

    const { customerId } = z
      .object({
        customerId: z.string().min(1, "Customer id must be provided"),
      })
      .parse(body);

    await deleteCustomerById(customerId);

    return res.status(200).send("Customer deleted successfully");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).send(error.errors[0].message);
    }
    return res.status(500).send("Could not delete order, try again later");
  }
}

export async function deleteCustomers(req: Request, res: Response) {
  const body = await req.body;
  try {
    const session = await getAuthSession(req);

    if (!session || session.role !== "ADMIN")
      return res.status(401).send("You aren't authorized to delete this data");

    const { customersIds } = z
      .object({
        customersIds: z
          .array(z.string())
          .min(1, "At least one customer id must be provided"),
      })
      .parse(body);

    await deleteCustomersById(customersIds);

    return res.status(200).send("Customers deleted successfully");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).send(error.errors[0].message);
    }
    return res.status(500).send("Could not delete customers, try again later");
  }
}

export async function updateCustomer(req: Request, res: Response) {
  const body = await req.body;
  try {
    const session = await getAuthSession(req);

    if (!session || session.role !== "ADMIN")
      return res.status(401).send("You aren't authorized to update this data");

    const { customerId, personal, address } = customerUpdateSchema.parse(body);

    await updateCustomerById(customerId, { personal, address });
    
    return res.status(200).send("Customer updated successfully");

  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).send(error.errors[0].message);
    }
    return res.status(500).send("Could not update customer, try again later");
  }
}
