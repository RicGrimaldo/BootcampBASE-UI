import { IconPlus } from "@tabler/icons-react";
import { useParams } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import { FetchingData } from "../components/FetchingData";

import { Header } from "../components/Header";
import { Client as IClient, Account as IAccount } from "../interfaces";
import { useGetCustomer, useGetCustomerAccounts } from "../api";
import { CreditCard } from "../components";

export const Client = () => {
	const { id } = useParams();
	const [client, setClient] = useState<IClient[]>([]);
	const [accounts, setAccounts] = useState<IAccount[]>([]);
	const { mutate } = useGetCustomer();
	const mutateCustomerAccounts = useGetCustomerAccounts().mutate;

	useEffect(() => {
		getCustomerInfo();
	}, []);

	const getCustomerInfo = () => {
		mutate(id != null ? id.toString() : "", {
			onSuccess: (data) => {
				setClient(data);
				mutateCustomerAccounts(id != null ? id.toString() : "", {
					onSuccess: (data) => setAccounts(data)
				});
			}
		});
	};

	return (
		<>
			<Header>
				<h1 className="text-3xl font-bold tracking-tight text-gray-900 text-center">
					Nombre del cliente: {client.name}
				</h1>
			</Header>

			<section className="flex flex-col items-center h-[calc(100vh-10rem)] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 py-7 w-full">
				{accounts.map((account) => (
							<CreditCard name={client.name} cardNumber={account.accountNumber} balance={account.balance} />
						))}
				</ul>
			</section>

			<button className="fixed right-8 bottom-8 p-3 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
				<div className="flex gap-2 items-center">
					<IconPlus className="w-4 h-4" />
					<span>Añadir cuenta</span>
				</div>
			</button>
		</>
	);
};
