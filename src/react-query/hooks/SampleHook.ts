import { useQuery } from "@tanstack/react-query";
import { sampleKeys } from "../queryKeys";
import { getSamples } from "../../api/sampleApi";

export const fetchSamples = async () => {
  const response = await getSamples();
  return response.data;
};

export const useSamples = () => {
  return useQuery({
    queryKey: [sampleKeys.sample],
    queryFn: () => {
      return fetchSamples();
    },
  });
};
