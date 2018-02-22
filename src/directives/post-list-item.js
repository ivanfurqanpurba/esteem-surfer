export default () => {
  return {
    restrict: 'AE',
    replace: true,
    scope: {
      post: '='
    },
    link: ($scope, $element) => {

    },
    // Instead of templateUrl, this way angular can render faster
    template: `
      <div class="post-list-item" ng-init="postImage = (post | catchPostImage)" ng-class="{'with-image': postImage}">
        <div class="post-header">
            <div class="post-info-bar">
                <div class="post-author-pic" author-bg-img-style author="{{ post.author }}"></div>
                <div class="post-info-right-side">
                    <span class="post-author"><a ng-click="authorClicked()">{{ post.author }}</a></span>
                    <span class="post-author-reputation">{{ post.author_reputation|authorReputation|number:0 }}</span>
                    <span class="post-cat">{{ 'IN' | translate }} <a ng-click="parentClicked()">{{ post.parent_permlink }}</a></span>
                    <span class="post-date"><a ng-click="createdClicked()" title="{{ post.created|dateFormatted }}"> {{post.created|timeAgo}}</a></span>
                </div>
            </div>
        </div>
        <div class="post-body">
            <div class="post-image" ng-if="postImage">
                <a ng-click="imageClicked()">
                    <img ng-src="{{ postImage }}">
                </a>
            </div>
            <h2 class="post-body-title"><a ng-click="titleClicked()" ng-class="{'visited': isVisited}">{{ post.title }}</a></h2>
            <div class="post-body-summary">
                <a ng-click="summaryClicked()" ng-class="{'visited': isVisited}" ng-bind-html="post.body | postSummary"></a>
            </div>
        </div>
        <div class="post-footer">
            <div class="post-voting">
                <div class="post-up-vote">
                    <a ng-click="upVoteClicked(post)">
                        <i class="fa fa-chevron-circle-up"></i>
                    </a>
                </div>
                <div class="post-total">
                    <content-payout-info content="post"></content-payout-info>
                </div>
            </div>
            <div class="post-voters">
                <a ng-click="votersClicked(post)">
                    <i class="fa fa-users"></i> {{ post.net_votes }}
                </a>
            </div>
            <div class="post-comment-count">
                <a ng-click="commentsClicked(post)">
                    <i class="fa fa-comments"></i> {{ post.children }}
                </a>
            </div>
        </div>
    </div>
    `,
    controller: ($scope, $rootScope, $location, $sce, $filter, $uibModal, storageService, helperService) => {
      $scope.isVisited = helperService.isPostRead($scope.post.id);

      const goPost = () => {
        let u = helperService.genPostUrl($scope.post.parent_permlink, $scope.post.author, $scope.post.permlink);
        $location.path(u);
      };

      $scope.votersClicked = (post) => {
        $uibModal.open({
          templateUrl: 'templates/post-voters.html',
          controller: 'postVotersCtrl',
          windowClass: 'postVotersModal',
          resolve: {
            post: function () {
              return post;
            }
          }
        }).result.then(function (data) {
          // Success
        }, function () {
          // Cancel
        });
      };

      $scope.titleClicked = () => {
        goPost();
      };

      $scope.summaryClicked = () => {
        goPost();
      };

      $scope.imageClicked = () => {
        goPost();
      };

      $scope.createdClicked = () => {
        goPost();
      };

      $scope.commentsClicked = () => {
        goPost();
      }
    }
  };
};
