import {
  createContract
} from '@stakeordie/griptape.js';

const stkdDef = {
  queries: {
    getStakingInfo() {
      const time = Math.round(new Date().getTime() / 1000);
      return { staking_info: { time } };
    },

    getBalance({ address, key }) {
      return { balance: { address, key } };
    }
  },

  messages: {
    stake(ctx, amount) {
      const handleMsg = { stake: { } };
      const transferAmount = [
        {
          amount: amount,
          denom: 'uscrt'
        }
      ];
      return { transferAmount, handleMsg };
    }
  }
};

export const stkd = createContract({
  id: 'stkd',
  at: 'secret1mtg8tuqsfvk9ma36tmtz5mc7pae73j0hsc6jla',
  definition: stkdDef
});
