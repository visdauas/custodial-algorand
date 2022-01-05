import { useQuery } from "blitz"
import getTatumData from "integrations/tatum/queries/getTatumData";

export const useTatum = () => {
    const [tatum] = useQuery(getTatumData, null)
    return tatum
}