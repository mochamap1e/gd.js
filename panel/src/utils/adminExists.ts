import { client } from "@/panel/clients/eden";

export async function adminExists() {
    try {
        const { data: exists } = await client.api.auth.doesAdminExist.post();

        return exists;
    } catch(error) {
        console.error(error);
        return undefined;
    }
}