import { createContext, useContext } from "react";
import fakeDonations from '../FakeData/fakeDonations'

export const DonationContext = createContext<typeof fakeDonations | undefined>(undefined);


export function useDataContext(){
    const data = useContext(DonationContext)

    if(data === undefined){
        throw new Error("useDataContext must be with a DonationsContext")
    }

    return data
}