import { commonAPI } from "./CommonAPI"
import { Server_URL } from "./Server_URL"


export const fetchGrievancesAPI=async()=>{
  return await commonAPI("GET",`${Server_URL}/fetchallgrievance`,{},"")
}
export const updateStatusAPI=async(id,status)=>{
  return await commonAPI("PATCH",`${Server_URL}/updatestatus/${id}/${status}`,{},"")
}

