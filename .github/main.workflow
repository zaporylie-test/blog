workflow "Deploy to production" {
  on = "push"
  resolves = ["deploy"]
}

action "filter" {
  uses = "actions/bin/filter@d820d56839906464fb7a57d1b4e1741cf5183efa"
  args = "branch test-fork"
}

action "deploy" {
  needs = ["filter"]
  uses = "zaporylie/ssh-deployment@master"
  args = "git pull && composer install && drush cr && drush -y updb && drush cim"
  secrets = [
    "USER",
    "HOST",
    "WORKSPACE",
    "PRIVATE_DEPLOY_KEY",
  ]
}
