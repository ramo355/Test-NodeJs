import axiosInstance from "../../axiosConfig";
import { eosConfig } from "../../eosConfig";
import { Action } from "../../models/action";
import { ActionResponse } from "./types";

export const fetchActions = async () => {
  const { accountName, pos, offset } = eosConfig;
  try {
    const response = await axiosInstance.post("", {
      account_name: accountName,
      pos,
      offset,
    });

    const actions: ActionResponse[] = response.data.actions.map(
      (action: any) => {
        const {
          action_trace: { trx_id },
          block_time,
          block_num,
        } = action;

        return {
          trx_id,
          block_time,
          block_num,
        };
      }
    );

    return actions;
  } catch (error) {
    console.error("Error fetching actions:", error);
    return [];
  }
};

export const saveActionsToDB = async (actions: ActionResponse[]) => {
  for (const action of actions) {
    try {
      const existingAction = await Action.findOne({ trx_id: action.trx_id });

      if (!existingAction) {
        await Action.create(action);
        console.log(`Saved new action: ${action.trx_id}`);
      }
    } catch (error) {
      console.error(`Error saving action ${action.trx_id}:`, error);
    }
  }
};
