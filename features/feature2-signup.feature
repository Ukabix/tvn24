Feature: Site sign up functionality

  Scenario: TC-001 Sign in with valid credentials | incogito
    Given User is not recognized with a cookie
    And User is on the main page
    And User has an email
    When User navigates to the sign up page
    And User registers with his email
    # And User navigates to the sign in page
    # And User gives valid credentials
    # Then User should sign in
    # And User should be able to view secure page and edit his profile

  ### validate for wrong username, pass and checkbox in next tcs
  # Scenario: TC-002 Sign in with invalid credentials - username | incognito
  #   Given User is on the main page
  #   # And User is already registered
  #   When User navigates to the sign in page
  #   And User gives invalid username
  #   Then User should not sign in
  #   And User should be able to view secure page to edit his profile

  # Scenario: TC-003 Sign in with invalid credentials - password | incognito
  #   Given User is on the main page
  #   # And User is already registered
  #   When User navigates to the sign in page
  #   And User gives invalid password
  #   Then User should not sign in
  #   And User should be able to view secure page to edit his profile

  # Scenario: TC-004 Sign in with valid credentials && using cookies | normal
  #   Given User is on the main page
  #   And User is recognized via cookie
  #   When User navigates to the sign in page
  #   And User picks his credentials from a list
  #   Then User should sign in
  #   And User should be able to view secure page to edit his profile

  # Scenario: TC-005 Sign in with invalid credentials - username && using cookies | normal
  #   Given User is on the main page
  #   And User is already registered
  #   When User navigates to the sign in page
  #   And User picks użyj innego konta
  #   And User gives invalid username
  #   Then User should not sign in
  #   And User should be able to view secure page to edit his profile

  # Scenario: TC-006 Sign in with invalid credentials - password && using cookies | normal
  #   Given User is on the main page
  #   And User is already registered
  #   When User navigates to the sign in page
  #   And User picks użyj innego konta
  #   And User gives invalid password
  #   Then User should not sign in
  #   And User should be able to view secure page to edit his profile