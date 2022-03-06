// log
import store from "../store";

const fetchDataRequest = () => {
  return {
    type: "CHECK_DATA_REQUEST",
  };
};

const fetchDataSuccess = (payload) => {
  return {
    type: "CHECK_DATA_SUCCESS",
    payload: payload,
  };
};

const fetchDataFailed = (payload) => {
  return {
    type: "CHECK_DATA_FAILED",
    payload: payload,
  };
};

export const fetchData = (account) => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      let account = await store.getState().blockchain.account;
      let name = await store
        .getState()
        .blockchain.smartContract.methods.symbol()
        .call();
      let test = await store
        .getState()
        .blockchain.smartContract.methods.balanceOf(account)
        .call();
      let totalSupply = test/1000000000;
      console.log("total:", test)

      dispatch(
        fetchDataSuccess({
          name,
          totalSupply,
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(fetchDataFailed("Could not load data from contract."));
    }
  };
};
