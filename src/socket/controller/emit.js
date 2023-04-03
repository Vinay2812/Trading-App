import io from "../../connections/socket.connection.js";
import logger from "../../utils/logger.js";
import { user_to_socket_map } from "../socket.js";

export async function updatePublishedList() {
  try {
    const req_success = await io.emitWithAck("/published-list/update");
    return req_success;
  } catch (error) {
    logger.error("Some receivers didn't sent the acknowledgement\n" + error);
  }
}

export async function updateOnePublishedListItemSaleRate(sale_rate, tender_id) {
  try {
    const req_success = await io.emitWithAck(
      "/published-list/update/sale_rate",
      { tender_id, sale_rate }
    );
    return req_success;
  } catch (err) {
    logger.error("Some receivers didn't sent the acknowledgement\n" + err);
  }
}

export async function updateTradingOption() {
  try {
    const req_success = await io.emitWithAck(
      "/published-list/update/trading-status"
    );
    return req_success;
  } catch (err) {
    logger.error("Some receivers didn't sent the acknowledgement\n" + err);
  }
}

export async function updateUserAuthorization(userId, accoid) {
  try {
    const socketId = user_to_socket_map.get(userId);
    const req_success = await io
      .to(socketId)
      .emitWithAck("/client/update-authorization", accoid);
    return req_success;
  } catch (err) {
    logger.error("Some receivers didn't sent the acknowledgement\n" + error);
  }
}
