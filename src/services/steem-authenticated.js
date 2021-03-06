import steem from 'steem';
import sc2 from 'sc2-sdk';

import {
  scAppAuth,
  scAppRevoke,
  scTransfer,
  scTransferToSavings,
  scTransferFromSavings,
  scTransferToVesting,
  scEsrowTransfer
} from '../helpers/steem-connect-helper';

export default ($rootScope, steemApi, $q, cryptoService) => {

  const follow = (wif, follower, following) => {
    wif = cryptoService.decryptKey(wif);

    const json = ['follow', {follower: follower, following: following, what: ['blog']}];
    let defer = $q.defer();
    steem.broadcast.customJson(wif, [], [follower], 'follow', JSON.stringify(json), (err, response) => {
      if (err) {
        defer.reject(err);
      } else {
        defer.resolve(response);
      }
    });

    return defer.promise;
  };

  const followSC = (token, follower, following) => {
    token = cryptoService.decryptKey(token);

    let defer = $q.defer();

    const api = sc2.Initialize({
      accessToken: token
    });

    api.follow(follower, following, function (err, res) {
      if (err) {
        defer.reject(err);
      } else {
        defer.resolve(res);
      }
    });

    return defer.promise;
  };

  const unfollow = (wif, unfollower, unfollowing) => {
    wif = cryptoService.decryptKey(wif);

    const json = ['follow', {follower: unfollower, following: unfollowing, what: []}];
    let defer = $q.defer();
    steem.broadcast.customJson(wif, [], [unfollower], 'follow', JSON.stringify(json), (err, response) => {
      if (err) {
        defer.reject(err);
      } else {
        defer.resolve(response);
      }
    });

    return defer.promise;
  };

  const unfollowSC = (token, unfollower, unfollowing) => {
    token = cryptoService.decryptKey(token);

    let defer = $q.defer();

    const api = sc2.Initialize({
      accessToken: token
    });

    api.unfollow(unfollower, unfollowing, function (err, res) {
      if (err) {
        defer.reject(err);
      } else {
        defer.resolve(res);
      }
    });

    return defer.promise;
  };

  const ignore = (wif, follower, following) => {
    wif = cryptoService.decryptKey(wif);

    const json = ['follow', {follower: follower, following: following, what: ['ignore']}];
    let defer = $q.defer();
    steem.broadcast.customJson(wif, [], [follower], 'follow', JSON.stringify(json), (err, response) => {
      if (err) {
        defer.reject(err);
      } else {
        defer.resolve(response);
      }
    });

    return defer.promise;
  };

  const ignoreSC = (token, follower, following) => {
    token = cryptoService.decryptKey(token);

    let defer = $q.defer();

    const api = sc2.Initialize({
      accessToken: token
    });

    api.ignore(follower, following, function (err, res) {
      if (err) {
        defer.reject(err);
      } else {
        defer.resolve(res);
      }
    });

    return defer.promise;
  };

  const reblog = (wif, account, author, permlink) => {
    wif = cryptoService.decryptKey(wif);

    const json = ['reblog', {account: account, author: author, permlink: permlink}];
    let defer = $q.defer();
    steem.broadcast.customJson(wif, [], [account], 'follow', JSON.stringify(json), (err, response) => {
      if (err) {
        defer.reject(err);
      } else {
        defer.resolve(response);
      }
    });

    return defer.promise;
  };

  const reblogSC = (token, account, author, permlink) => {
    token = cryptoService.decryptKey(token);

    let defer = $q.defer();

    const api = sc2.Initialize({
      accessToken: token
    });

    api.reblog(account, author, permlink, function (err, res) {
      if (err) {
        defer.reject(err);
      } else {
        defer.resolve(res);
      }
    });

    return defer.promise;
  };

  const vote = (wif, voter, author, permlink, weight) => {
    wif = cryptoService.decryptKey(wif);

    let defer = $q.defer();
    steem.broadcast.vote(wif, voter, author, permlink, weight, function (err, response) {
      if (err) {
        defer.reject(err);
      } else {
        defer.resolve(response);
      }
    });
    return defer.promise;
  };

  const voteSC = (token, voter, author, permlink, weight) => {
    token = cryptoService.decryptKey(token);

    let defer = $q.defer();

    const api = sc2.Initialize({
      accessToken: token
    });

    api.vote(voter, author, permlink, weight, function (err, res) {
      if (err) {
        defer.reject(err);
      } else {
        defer.resolve(res);
      }
    });

    return defer.promise;

  };

  const comment = (wif, parentAuthor, parentPermlink, author, permlink, title, body, jsonMetadata, options, voteWeight) => {
    wif = cryptoService.decryptKey(wif);

    let defer = $q.defer();

    const opArray = [
      ['comment', {
        parent_author: parentAuthor,
        parent_permlink: parentPermlink,
        author: author,
        permlink: permlink,
        title: title,
        body: body,
        json_metadata: JSON.stringify(jsonMetadata)
      }]
    ];

    if (options) {
      const e = ['comment_options', options];
      opArray.push(e);
    }

    if (voteWeight) {
      const e = ['vote', {
        voter: author,
        author: author,
        permlink: permlink,
        weight: voteWeight
      }];
      opArray.push(e);
    }

    console.log(opArray);

    steem.broadcast.send({operations: opArray, extensions: []}, {posting: wif}, function (err, response) {
      if (err) {
        defer.reject(err);
      } else {
        defer.resolve(response);
      }
    });

    return defer.promise;
  };

  const commentSc = (token, parentAuthor, parentPermlink, author, permlink, title, body, jsonMetadata, options, voteWeight) => {
    token = cryptoService.decryptKey(token);

    let defer = $q.defer();

    const api = sc2.Initialize({
      accessToken: token
    });

    const params = {
      parent_author: parentAuthor,
      parent_permlink: parentPermlink,
      author: author,
      permlink: permlink,
      title: title,
      body: body,
      json_metadata: JSON.stringify(jsonMetadata)
    };

    const opArray = [
      ['comment', params]
    ];

    if (options) {
      const e = ['comment_options', options];
      opArray.push(e);
    }

    if (voteWeight) {
      const e = ['vote', {
        voter: author,
        author: author,
        permlink: permlink,
        weight: voteWeight
      }];
      opArray.push(e);
    }

    console.log(opArray);

    api.broadcast(opArray, function (err, response) {
      if (err) {
        defer.reject(err);
      } else {
        defer.resolve(response);
      }
    });

    return defer.promise;
  };

  const deleteComment = (wif, author, permlink) => {
    wif = cryptoService.decryptKey(wif);

    let defer = $q.defer();

    steem.broadcast.deleteComment(wif, author, permlink, function (err, response) {
      if (err) {
        defer.reject(err);
      } else {
        defer.resolve(response);
      }
    });

    return defer.promise;
  };

  const deleteCommentSc = (token, author, permlink) => {
    token = cryptoService.decryptKey(token);

    let defer = $q.defer();

    const api = sc2.Initialize({
      accessToken: token
    });

    const params = {
      author: author,
      permlink: permlink
    };

    api.broadcast([['delete_comment', params]], function (err, response) {
      if (err) {
        defer.reject(err);
      } else {
        defer.resolve(response);
      }
    });

    return defer.promise;
  };

  const accountUpdate = (wif, account, owner, active, posting, memoKey, jsonMetadata) => {
    wif = cryptoService.decryptKey(wif);

    let defer = $q.defer();

    steem.broadcast.accountUpdate(wif, account, owner, active, posting, memoKey, jsonMetadata, function (err, response) {
      if (err) {
        defer.reject(err);
      } else {
        defer.resolve(response);
      }
    });

    return defer.promise;
  };

  const profileUpdate = (wif, account, memoKey, newJsonMetadata) => {
    return accountUpdate(wif, account, undefined, undefined, undefined, memoKey, newJsonMetadata);
  };

  const profileUpdateSc = (token, account, memoKey, newJsonMetadata) => {
    token = cryptoService.decryptKey(token);

    let defer = $q.defer();
    defer.reject('Steem connect profile update not implemented yet.');
    return defer.promise;
  };

  const grantPostingPermission = (wif, accountData) => {
    const postingAuth = accountData.posting;
    postingAuth.account_auths.push(['esteemapp', postingAuth.weight_threshold]);
    return accountUpdate(wif, accountData.name, undefined, undefined, postingAuth, accountData.memo_key, accountData.json_metadata);
  };

  const grantPostingPermissionSc = () => {
    let defer = $q.defer();
    scAppAuth(() => {
      defer.resolve('OK');
    }, () => {
      defer.reject(`The window closed before expected.`);
    });

    return defer.promise;
  };

  const revokePostingPermission = (wif, accountData) => {
    const postingAuth = accountData.posting;

    let ind = 0;
    for (let i = 0; i < postingAuth.account_auths.length; i++) {
      if (postingAuth.account_auths[i][0] === 'esteemapp') {
        ind = i;
        break;
      }
    }
    postingAuth.account_auths.splice(ind, 1);

    return accountUpdate(wif, accountData.name, undefined, undefined, postingAuth, accountData.memo_key, accountData.json_metadata);
  };

  const revokePostingPermissionSc = () => {
    let defer = $q.defer();

    scAppRevoke(() => {
      defer.resolve('OK');
    }, () => {
      defer.reject(`The window closed before expected.`);
    });

    return defer.promise;
  };

  const transfer = (wif, from, to, amount, memo) => {
    wif = cryptoService.decryptKey(wif);

    let defer = $q.defer();

    steem.broadcast.transfer(wif, from, to, amount, memo, function (err, result) {
      if (err) {
        defer.reject(err);
      } else {
        defer.resolve(result);
      }
    });

    return defer.promise;
  };

  const transferSc = (from, to, amount, memo) => {
    let defer = $q.defer();

    scTransfer(from, to, amount, memo, () => {
      defer.resolve('OK');
    }, () => {
      defer.reject(`The window closed before expected.`);
    });

    return defer.promise;
  };

  const transferToSavings = (wif, from, to, amount, memo) => {
    wif = cryptoService.decryptKey(wif);

    let defer = $q.defer();

    steem.broadcast.transferToSavings(wif, from, to, amount, memo, function (err, result) {
      if (err) {
        defer.reject(err);
      } else {
        defer.resolve(result);
      }
    });

    return defer.promise;
  };

  const transferToSavingsSc = (from, to, amount, memo) => {
    let defer = $q.defer();

    scTransferToSavings(from, to, amount, memo, () => {
      defer.resolve('OK');
    }, () => {
      defer.reject(`The window closed before expected.`);
    });

    return defer.promise;
  };

  const transferFromSavings = (wif, from, requestId, to, amount, memo) => {
    wif = cryptoService.decryptKey(wif);

    let defer = $q.defer();

    steem.broadcast.transferFromSavings(wif, from, requestId, to, amount, memo, function (err, result) {
      if (err) {
        defer.reject(err);
      } else {
        defer.resolve(result);
      }
    });

    return defer.promise;
  };

  const transferFromSavingsSc = (from, requestId, to, amount, memo) => {
    let defer = $q.defer();

    scTransferFromSavings(from, requestId, to, amount, memo, () => {
      defer.resolve('OK');
    }, () => {
      defer.reject(`The window closed before expected.`);
    });

    return defer.promise;
  };

  const transferToVesting = (wif, from, to, amount) => {
    wif = cryptoService.decryptKey(wif);

    let defer = $q.defer();

    steem.broadcast.transferToVesting(wif, from, to, amount, function (err, result) {
      if (err) {
        defer.reject(err);
      } else {
        defer.resolve(result);
      }
    });

    return defer.promise;
  };

  const transferToVestingSc = (from, to, amount) => {
    let defer = $q.defer();

    scTransferToVesting(from, to, amount, () => {
      defer.resolve('OK');
    }, () => {
      defer.reject(`The window closed before expected.`);
    });

    return defer.promise;
  };

  const claimRewardBalance = (wif, account, rewardSteem, rewardSbd, rewardVests) => {
    wif = cryptoService.decryptKey(wif);

    let defer = $q.defer();

    steem.broadcast.claimRewardBalance(wif, account, rewardSteem, rewardSbd, rewardVests, function (err, result) {
      if (err) {
        defer.reject(err);
      } else {
        defer.resolve(result);
      }
    });

    return defer.promise;
  };

  const claimRewardBalanceSc = (token, account, rewardSteem, rewardSbd, rewardVests) => {
    token = cryptoService.decryptKey(token);

    let defer = $q.defer();

    const api = sc2.Initialize({
      accessToken: token
    });

    api.claimRewardBalance(account, rewardSteem, rewardSbd, rewardVests, function (err, res) {
      if (err) {
        defer.reject(err);
      } else {
        defer.resolve(res);
      }
    });

    return defer.promise;
  };

  const escrowTransfer = (wif, from, to, agent, escrowId, sbdAmount, steemAmount, fee, ratificationDeadline, escrowExpiration, jsonMeta) => {
    wif = cryptoService.decryptKey(wif);

    let defer = $q.defer();

    steem.broadcast.escrowTransfer(wif, from, to, agent, escrowId, sbdAmount, steemAmount, fee, ratificationDeadline, escrowExpiration, jsonMeta, function (err, result) {
      if (err) {
        defer.reject(err);
      } else {
        defer.resolve(result);
      }
    });

    return defer.promise;
  };

  const escrowTransferSc = (from, to, agent, escrowId, sbdAmount, steemAmount, fee, ratificationDeadline, escrowExpiration, jsonMeta) => {
    let defer = $q.defer();

    scEsrowTransfer(from, to, agent, escrowId, sbdAmount, steemAmount, fee, ratificationDeadline, escrowExpiration, jsonMeta, () => {
      defer.resolve('OK');
    }, () => {
      defer.reject(`The window closed before expected.`);
    });

    return defer.promise;
  };

  const escrowApprove = (wif, from, to, agent, who, escrowId, approve) => {
    wif = cryptoService.decryptKey(wif);

    let defer = $q.defer();

    steem.broadcast.escrowApprove(wif, from, to, agent, who, escrowId, approve, function (err, result) {
      if (err) {
        defer.reject(err);
      } else {
        defer.resolve(result);
      }
    });

    return defer.promise;
  };

  const escrowApproveSc = (from, to, agent, who, escrowId, approve) => {
    let defer = $q.defer();
    defer.reject('Steem connect escrowApprove not implemented yet.');
    return defer.promise;
  };

  const escrowDispute = (wif, from, to, agent, who, escrowId) => {
    wif = cryptoService.decryptKey(wif);

    let defer = $q.defer();

    steem.broadcast.escrowDispute(wif, from, to, agent, who, escrowId, function (err, result) {
      if (err) {
        defer.reject(err);
      } else {
        defer.resolve(result);
      }
    });

    return defer.promise;
  };

  const escrowDisputeSc = (from, to, agent, who, escrowId) => {
    let defer = $q.defer();
    defer.reject('Steem connect escrowDispute not implemented yet.');
    return defer.promise;
  };

  const escrowRelease = (wif, from, to, agent, who, receiver, escrowId, sbdAmount, steemAmount) => {
    wif = cryptoService.decryptKey(wif);

    let defer = $q.defer();

    steem.broadcast.escrowRelease(wif, from, to, agent, who, receiver, escrowId, sbdAmount, steemAmount, function (err, result) {
      if (err) {
        defer.reject(err);
      } else {
        defer.resolve(result);
      }
    });

    return defer.promise;
  };

  const escrowReleaseSc = (from, to, agent, who, receiver, escrowId, sbdAmount, steemAmount) => {
    let defer = $q.defer();
    defer.reject('Steem connect escrowDispute not implemented yet.');
    return defer.promise;
  };

  const setWithdrawVestingRoute = (wif, from, to, percent, autoVest) => {
    wif = cryptoService.decryptKey(wif);

    let defer = $q.defer();

    steem.broadcast.setWithdrawVestingRoute(wif, from, to, percent, autoVest, function (err, result) {
      if (err) {
        defer.reject(err);
      } else {
        defer.resolve(result);
      }
    });

    return defer.promise;
  };

  const setWithdrawVestingRouteSc = (token, from, to, percent, autoVest) => {
    token = cryptoService.decryptKey(token);

    let defer = $q.defer();
    defer.reject('Steem connect setWithdrawVestingRoute not implemented yet.');
    return defer.promise;
  };

  const withdrawVesting = (wif, account, vestingShares) => {
    wif = cryptoService.decryptKey(wif);

    let defer = $q.defer();

    steem.broadcast.withdrawVesting(wif, account, vestingShares, function (err, result) {
      if (err) {
        defer.reject(err);
      } else {
        defer.resolve(result);
      }
    });

    return defer.promise;
  };

  const withdrawVestingSc = (account, vestingShares) => {
    let defer = $q.defer();
    defer.reject('Steem connect withdrawVesting not implemented yet.');
    return defer.promise;
  };

  const getProperWif = (r) => {
    for (let i of r) {
      if ($rootScope.user.keys[i]) {
        return $rootScope.user.keys[i];
      }
    }
  };

  const getAccessToken = () => {
    return $rootScope.user.token
  };

  return {
    follow: (following) => {
      // requires Active or Owner key
      const follower = $rootScope.user.username;

      switch ($rootScope.user.type) {
        case 's':
          const wif = getProperWif(['active', 'owner']);
          return follow(wif, follower, following);
          break;
        case 'sc':
          const token = getAccessToken();
          return followSC(token, follower, following);
          break;
      }
    },
    unfollow: (following) => {
      // requires Active or Owner key
      const follower = $rootScope.user.username;

      switch ($rootScope.user.type) {
        case 's':
          const wif = getProperWif(['active', 'owner']);
          return unfollow(wif, follower, following);
          break;
        case 'sc':
          const token = getAccessToken();
          return unfollowSC(token, follower, following);
          break;
      }
    },
    mute: (following) => {
      // requires Active or Owner key
      const follower = $rootScope.user.username;

      switch ($rootScope.user.type) {
        case 's':
          const wif = getProperWif(['active', 'owner']);
          return ignore(wif, follower, following);
          break;
        case 'sc':
          const token = getAccessToken();
          return ignoreSC(token, follower, following);
          break;
      }
    },
    reblog: (author, permlink) => {
      // requires Posting key
      const account = $rootScope.user.username;

      switch ($rootScope.user.type) {
        case 's':
          const wif = getProperWif(['posting']);
          return reblog(wif, account, author, permlink);
          break;
        case 'sc':
          const token = getAccessToken();
          return reblogSC(token, account, author, permlink);
          break;
      }
    },
    vote: (author, permlink, weight) => {
      // requires Posting key

      const voter = $rootScope.user.username;
      switch ($rootScope.user.type) {
        case 's':
          const wif = getProperWif(['posting']);
          return vote(wif, voter, author, permlink, weight);
          break;
        case 'sc':
          const token = getAccessToken();
          return voteSC(token, voter, author, permlink, weight);
          break;
      }
    },
    comment: (parentAuthor, parentPermlink, author, permlink, title, body, jsonMetadata, options, voteWeight = null) => {
      // requires Posting key
      switch ($rootScope.user.type) {
        case 's':
          const wif = getProperWif(['posting']);
          return comment(wif, parentAuthor, parentPermlink, author, permlink, title, body, jsonMetadata, options, voteWeight);
          break;
        case 'sc':
          const token = getAccessToken();
          return commentSc(token, parentAuthor, parentPermlink, author, permlink, title, body, jsonMetadata, options, voteWeight);
          break;
      }
    },
    deleteComment: (author, permlink) => {
      switch ($rootScope.user.type) {
        case 's':
          const wif = getProperWif(['posting']);
          return deleteComment(wif, author, permlink);
          break;
        case 'sc':
          const token = getAccessToken();
          return deleteCommentSc(token, author, permlink);
          break;
      }
    },
    grantPostingPermission: (accountData) => {
      switch ($rootScope.user.type) {
        case 's':
          const wif = getProperWif(['active']);
          return grantPostingPermission(wif, accountData);
          break;
        case 'sc':
          return grantPostingPermissionSc();
          break;
      }
    },
    revokePostingPermission: (accountData) => {
      switch ($rootScope.user.type) {
        case 's':
          const wif = getProperWif(['active']);
          return revokePostingPermission(wif, accountData);
          break;
        case 'sc':
          return revokePostingPermissionSc();
          break;
      }
    },
    transfer: (wif = null, from, to, amount, memo) => {
      if (wif) {
        return transfer(wif, from, to, amount, memo);
      } else {
        return transferSc(from, to, amount, memo);
      }
    },
    transferToSavings: (wif = null, from, to, amount, memo) => {
      if (wif) {
        return transferToSavings(wif, from, to, amount, memo);
      } else {
        return transferToSavingsSc(from, to, amount, memo);
      }
    },
    transferFromSavings: (wif = null, from, requestId, to, amount, memo) => {
      if (wif) {
        return transferFromSavings(wif, from, requestId, to, amount, memo);
      } else {
        return transferFromSavingsSc(from, requestId, to, amount, memo);
      }
    },
    escrowTransfer: (wif = null, from, to, agent, escrowId, sbdAmount, steemAmount, fee, ratificationDeadline, escrowExpiration, jsonMeta) => {
      if (wif) {
        return escrowTransfer(wif, from, to, agent, escrowId, sbdAmount, steemAmount, fee, ratificationDeadline, escrowExpiration, jsonMeta);
      } else {
        return escrowTransferSc(from, to, agent, escrowId, sbdAmount, steemAmount, fee, ratificationDeadline, escrowExpiration, jsonMeta);
      }
    },
    escrowApprove: (wif = null, from, to, agent, who, escrowId, approve) => {
      if (wif) {
        return escrowApprove(wif, from, to, agent, who, escrowId, approve);
      } else {
        return escrowApproveSc(from, to, agent, who, escrowId, approve);
      }
    },
    escrowDispute: (wif = null, from, to, agent, who, escrowId) => {
      if (wif) {
        return escrowDispute(wif, from, to, agent, who, escrowId);
      } else {
        return escrowDisputeSc(from, to, agent, who, escrowId);
      }
    },
    escrowRelease: (wif = null, from, to, agent, who, receiver, escrowId, sbdAmount, steemAmount) => {
      if (wif) {
        return escrowRelease(wif, from, to, agent, who, receiver, escrowId, sbdAmount, steemAmount);
      } else {
        return escrowReleaseSc(from, to, agent, who, receiver, escrowId, sbdAmount, steemAmount);
      }
    },
    transferToVesting: (wif = null, from, to, amount) => {
      if (wif) {
        return transferToVesting(wif, from, to, amount)
      } else {
        return transferToVestingSc(from, to, amount);
      }
    },
    claimRewardBalance: (rewardSteem, rewardSbd, rewardVests) => {
      const account = $rootScope.user.username;

      switch ($rootScope.user.type) {
        case 's':
          const wif = getProperWif(['posting']);
          return claimRewardBalance(wif, account, rewardSteem, rewardSbd, rewardVests);
          break;
        case 'sc':
          const token = getAccessToken();
          return claimRewardBalanceSc(token, account, rewardSteem, rewardSbd, rewardVests);
          break;
      }
    },
    profileUpdate: (account, memoKey, jsonMetadata) => {
      switch ($rootScope.user.type) {
        case 's':
          const wif = getProperWif(['active']);
          return profileUpdate(wif, account, memoKey, jsonMetadata);
          break;
        case 'sc':
          const token = getAccessToken();
          return profileUpdateSc(token, account, memoKey, jsonMetadata);
          break;
      }
    },
    setWithdrawVestingRoute: (to, percent, autoVest) => {
      const account = $rootScope.user.username;

      switch ($rootScope.user.type) {
        case 's':
          const wif = getProperWif(['active']);
          return setWithdrawVestingRoute(wif, account, to, percent, autoVest);
          break;
        case 'sc':
          const token = getAccessToken();
          return setWithdrawVestingRouteSc(token, account, to, percent, autoVest);
          break;
      }
    },
    withdrawVesting: (wif = null, account, vestingShares) => {
      if (wif) {
        return withdrawVesting(wif, account, vestingShares)
      } else {
        return withdrawVestingSc(account, vestingShares);
      }
    }
  }
};
