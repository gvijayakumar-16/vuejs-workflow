function getWorkflowToolboxSteps() {
  return {
    General: {
      Communication: [
        {
          Name: "SendEmailToUser",
          DisplayName: "Mail user",
          Description: "Send an email to the user involved in the Workflow",
          IsOnPrem: "False",
          Info:
            "This workflow-step enables you to communicate to the user via email at any time in the workflow. The content of the information is defined by .msg file templates that you can upload to the cloud-backend. They can be created with Outlook and might also contain attachments. In the MSG Template, you can use variables that will be used to personalize the email before sending. You can place the variables into the subject or body part of the msg files.<br><br> Currently supported are:<br> <b>||UserPrincipalName||<br> ||FirstName||<br> ||LastName||</b><br><br> When you upload a template, please specify a friendly (display) name for the template as well as the used variables without the || pre and postfix. (e.g. UserPrincipalName)<br><br> The email is send from the cloud backend and the sender of the email is acs@cloudficient.com.",
          Licensed: true
        },
        {
          Name: "SendEmailToAdmin",
          DisplayName: "Mail administrator",
          Description: "Send an email to the administrator",
          IsOnPrem: "False",
          Info:
            "This workflow-step enables you to communicate and inform administrators any time in the workflow. The content of the information is defined by .msg file templates that you can upload to the cloud-backend. They can be created with Outlook and might also contain attachments. <br><br> In the MSG Template, you can use variables that will be used to personalize the email before sending. You can place the variables into the subject or body part of the msg files. <br><br> Currently supported are:<br> <b>||UserPrincipalName||<br> ||FirstName||<br> ||LastName||</b> <br><br> When you upload a template, please specify a friendly (display) name for the template as well as the used variables without the || pre and postfix. (e.g. UserPrincipalName) as well as the recipients. If multiple recipients are used you can enter them in the recipients field of the workflow step configuration screen separated by a semicolon. <br><br> The email is send from the cloud backend and the sender of the email is acs@cloudficient.com.",
          Licensed: true
        },
        {
          Name: "SendEmailToUserViaAgent",
          DisplayName: "Mail user via agent",
          Description: "Send an email to the user involved in the Workflow",
          IsOnPrem: "True",
          Info:
            "This workflow-step enables you to communicate to the user via email at any time in the workflow using your own email infrastructure on-premises. <br><br> The content of the information is defined by .msg file templates that you can upload to the cloud-backend. They can be created with Outlook and might also contain attachments. Currently the maximum size of a template might not exceed 120kb, if sending via agent. In the MSG Template, you can use variables that will be used to personalize the email before sending. You can place the variables into the subject or body part of the msg files. <br><br> Currently supported are:<br> <b>||UserPrincipalName||<br> ||FirstName||<br> ||LastName||</b> <br><br> When you upload a template, please specify a friendly (display) name for the template as well as the used variables without the || pre and postfix. (e.g. UserPrincipalName) Furthermore, you need to choose the responsible Agent and the credentials which will be used to process the command. <br><br> For the agent being able to send an SMTP Mail, you need to configure SMTP Settings and a From address.",
          Licensed: true
        }
      ],
      Wait: [
        {
          Name: "WaitTimeSpan",
          DisplayName: "Wait time",
          Description: "Wait a certain time interval",
          IsOnPrem: "False",
          Info:
            "This workflow-step enables you to wait a configured timespan before the workflow continues.<br><br> This might for example be useful, if you want to inform the user via email steps and then wait for example 48h before the Onboarding Process continues.",
          Licensed: true
        },
        {
          Name: "WaitForTrigger",
          DisplayName: "Manual trigger",
          Description: "Wait for a manual trigger",
          IsOnPrem: "False",
          Info:
            "<p>In some occasions, you need to stop the workflow until an external event happens.</p><p>A good example when this step can be used is when certain aspects of the onboarding process should not be automated with OnBoard like a Mailbox Move to the cloud that is targeted by a different team.</p><b>To configure this step, you need to define</b><ul><li>A display name for the trigger (e.g. WaitMailboxMove).</li></ul><p>The workflow will stop, and the users which reached this step will appear under the <i><b>Triggers</b></i> Tab in Onboard.</p><p>The workflow will only continue when the trigger has been manually fired in the <i><b>Triggers</b></i> tab.</p>",
          Licensed: true
        },
        {
          Name: "WaitAutoTrigger",
          DisplayName: "Auto trigger",
          Description: "Automatically trigger based on an event",
          IsOnPrem: "True",
          Info: "Automatically triggers based on an event",
          Licensed: true
        },
        {
          Name: "WaitDateSpan",
          DisplayName: "Wait date",
          Description: "Wait a certain date & time interval",
          IsOnPrem: "False",
          Info:
            "This workflow-step enables you to wait a configured timespan before the workflow continues.<br><br> This might for example be useful, if you want to inform the user via email steps and then wait for example 48h before the Onboarding Process continues.",
          Licensed: false
        }
      ],
      Workflow: [
        {
          Name: "EndWorkflowSuccessfully",
          DisplayName: "End workflow",
          Description: "End created workflow.",
          IsOnPrem: "False",
          Info:
            "This workflow-step, is automatically included as a last step in a workflow template. It creates the audit entries for the workflow instance and cleans up the backend.<br><br>There are no parameters to configure.",
          Licensed: true
        }
      ],
      Learning: [
        {
          Name: "AddUserToPlan",
          DisplayName: "LMS Add user to plan",
          Description: "Adding user to a plan in LMS",
          IsOnPrem: "True",
          Info:
            "A powerful Cloud LMS is one that is able to integrate with other enterprise applications, such as ERPs, HR softwares, reporting tools etc. Interconnection between such systems is key to streamline organizational processes and improve business performance.",
          Licensed: false
        },
        {
          Name: "AddUserToPlanNulia",
          DisplayName: "Nulia Add user to plan",
          Description: "Adding user to a plan in Nulia",
          IsOnPrem: "True",
          Info:
            "A powerful Cloud LMS is one that is able to integrate with other enterprise applications, such as ERPs, HR softwares, reporting tools etc. Interconnection between such systems is key to streamline organizational processes and improve business performance.",
          Licensed: false
        },
        {
          Name: "AssignLicenseNulia",
          DisplayName: "Assign license to user",
          Description: "Assign license to user in Nulia system.",
          IsOnPrem: "False",
          Info:
            "Provide a Nulia license to your user, please ensure that you have sufficient Nulia licenses.",
          Licensed: false
        },
        {
          Name: "AssignOutcomeNulia",
          DisplayName: "Assign outcome to user",
          Description: "Assign outcome to user in Nulia system.",
          IsOnPrem: "False",
          Info:
            "Select and apply a Nulia outcome (e.g. learn Outlook) to your selected user.",
          Licensed: false
        }
      ]
    },
    "Office 365": {
      Exchange: [
        {
          Name: "O365PreflightHybridPrimaryToCloud",
          DisplayName: "Preflight primary to cloud",
          Description:
            "Preflight check to if object exists, permissions and e-mail addresses valid.",
          IsOnPrem: "True",
          Info:
            "<p>This workflow-step enables you to check if the requirements for a Mailbox Move to Office 365. A new move requests with the additional <b><i>“-whatif”</i></b> parameter will be executed.</p><b>To configure this step, you need to define</b><ul><li>The agent which should execute this workflow-step</li><li>The Office 365 Credentials (Exchange or Global Admin) which should be used to execute the mailbox move</li><li>The target delivery domain in Office 365</li><li>The OnPrem Exchange Credentials (Exchange Admin or Domain Admin), that Office 365 can use to pull the data into the cloud</li><li>And the Migration Endpoint that you’ve defined in your hybrid setup</li></ul>",
          Licensed: true
        },
        {
          Name: "O365HybridMovePrimaryToCloud",
          DisplayName: "Move primary to cloud",
          Description: "Move the primary mailbox to the cloud",
          IsOnPrem: "True",
          Info:
            "<p>This workflow-step enables you move the Primary OnPrem Mailbox in a hybrid environment to Office 365. A new Mailbox move request will be issued and Exchange’s MRS (Mailbox Replication Service) will be used to move the data.</p><p>If the user has also an OnPrem Archive Mailbox, the archive will be moved as well.</p><b>To configure this step, you need to define</b><ul><li>The agent which should execute this workflow-step</li><li>The Office 365 Credentials (Exchange or Global Admin) which should be used to execute the mailbox move</li><li>The target delivery domain in Office 365</li><li>The OnPrem Exchange Credentials (Exchange Admin or Domain Admin), that Office 365 can use to pull the data into the cloud</li><li>The Migration Endpoint that you’ve defined in your hybrid setup</li><li>A bad item limit, which defines the maximum number of failed/corrupted items that you’re willing to accept and still treat the mailbox move as successful</li><li>A large item limit, which defines the maximum number too large items for Office 365 that you’re willing to accept and still treat the mailbox move as successful</li></ul>",
          Licensed: true
        },
        {
          Name: "O365HybridMoveArchiveToCloud",
          DisplayName: "Move archive to cloud",
          Description: "Move a hybrid archive to the cloud",
          IsOnPrem: "True",
          Info:
            "<p>This workflow-step enables you move the OnPrem Mailbox Archive Mailbox in a hybrid environment to Office 365. A new Mailbox move request will be issued with the <b><i>“-Archive”</b></i> parameter and Exchange’s MRS (Mailbox Replication Service) will be used to move the data.</p><b>To configure this step, you need to define</b><ul><li>The agent which should execute this workflow-step</li><li>The Office 365 Credentials (Exchange or Global Admin) which should be used to execute the mailbox move</li><li>The target delivery domain in Office 365</li><li>The OnPrem Exchange Credentials (Exchange Admin or Domain Admin), that Office 365 can use to pull the data into the cloud</li><li>The Migration Endpoint that you’ve defined in your hybrid setup</li><li>A bad item limit, which defines the maximum number of failed/corrupted items that you’re willing to accept and still treat the mailbox move as successful</li><li>A large item limit, which defines the maximum number too large items for Office 365 that you’re willing to accept and still treat the mailbox move as successful</li></ul>",
          Licensed: true
        },
        {
          Name: "O365AdjustMaxMessageSize",
          DisplayName: "Adjust max message size",
          Description: "Adjust max message size",
          IsOnPrem: "True",
          Info:
            "The default max message size in O365 is 35 MB. This workflow step allows you to customise the max message size per mailbox user.",
          Licensed: true
        },
        {
          Name: "HybridCreateArchiveMailboxO365",
          DisplayName: "Hybrid create archive mailbox",
          Description:
            "Create a cloud based personal archive for a user with an on-premise mailbox",
          IsOnPrem: "True",
          Info:
            "This workflow-step enables you to create a hybrid archive mailbox for a user in Office 365. The primary mailbox can be either on-premises or in the cloud. <br><br> The workflow step will issue a create archive request to O365 and wait until the archive is provisioned by Microsoft in O365. <br><br> To configure this step, you need to define Agent, Credentials and an Exchange OnPrem Host where an Remote PowerShell connection can be established to.",
          Licensed: true
        },
        {
          Name: "HybridHideFromAddressbook",
          DisplayName: "Hybrid hide from addressbook",
          Description: "Hide a mailbox from the address book",
          IsOnPrem: "True",
          Info:
            "This workflow-step enables you to hide a user from the Exchange/O365 Addressbook.",
          Licensed: true
        },
        {
          Name: "HybridSetLitigationHold",
          DisplayName: "Hybrid set litigation hold",
          Description: "Set litigation hold for a mailbox",
          IsOnPrem: "True",
          Info:
            "This workflow-step allows you to set apply a litigation hold to a users mailbox.<br><br>To configure this step, you need to define Agent, Credentials and an Exchange OnPrem Host where an Remote Powershell connection can be established to.",
          Licensed: true
        },
        {
          Name: "O365DeleteMessageClassArchive",
          DisplayName: "Delete archive message class",
          Description: "Delete a message class from archive mailbox",
          IsOnPrem: "True",
          Info:
            "<p>This workflow steps enables you to delete the appropriate shortcut message class from the target archive in O365.</p><b>To configure this step, you need to define</b><ul><li><b>Agent</b> - Specify the appropriate agent</li><li><b>Credentials</b> - Specify the O365 credentials</li><li>Specify which message class you wish to scan for and delete i.e. <b>IPM.Note.EnterpriseVault.Shortcut</b></li></ul>",
          Licensed: true
        },
        {
          Name: "O365DeleteMessageClassPrimary",
          DisplayName: "Delete primary message class",
          Description: "Delete a message class from primary mailbox",
          IsOnPrem: "True",
          Info:
            "This workflow steps enables you to delete the appropriate shortcut message class from the target mailbox in O365.<br><br><b>Agent</b> - Specify the appropriate agent<br><b>Credentials</b> - Specify the O365 credentials<br>Specify which message class you wish to scan for and delete i.e. <b>IPM.Note.EnterpriseVault.Shortcut</b>",
          Licensed: true
        },
        {
          Name: "O365HybridMovePrimaryToCloudSyncOnly",
          DisplayName: "Sync primary to cloud",
          Description: "Sync the primary mailbox to the cloud",
          IsOnPrem: "True",
          Info:
            "<p>This workflow-step enables you move the Sync OnPrem Mailbox in a hybrid environment to Office 365. A new Mailbox move request will be issued and Exchange’s MRS (Mailbox Replication Service) will be used to move the data.</p><p>If the user has also an OnPrem Archive Mailbox, the archive will be moved as well.</p><b>To configure this step, you need to define</b><ul><li>The agent which should execute this workflow-step</li><li>The O365 Credentials (Exchange or Global Admin) which should be used to execute the mailbox move</li><li>The target delivery domain in Office 365</li><li>The OnPrem Exchange Credentials (Exchange Admin or Domain Admin), that Office 365 can use to pull the data into the cloud</li><li>And the Migration Endpoint that you’ve defined in your hybrid setup</li><li>A bad item limit, which defines the maximum number of failed/corrupted items that you’re willing to accept and still treat the mailbox move as successful</li><li>A large item limit, which defines the maximum number too large items for Office 365 that you’re willing to accept and still treat the mailbox move as successful</li></ul>",
          Licensed: false
        },
        {
          Name: "O365HybridMovePrimaryToCloudFinalize",
          DisplayName: "Switch primary to cloud",
          Description: "Switch the primary mailbox to the cloud",
          IsOnPrem: "True",
          Info:
            "<p>This workflow step finalises mailboxes previously synced to O365. This completes the move from OnPrem to O365 and puts the moved mailboxes into a state that ensures they can now be accessible to users.</p><b>To configure this step, you need to define:</b><ul><li>The agent which should execute this workflow-step.</li><li>The O365 Credentials (Exchange or Global Admin) which should be used to execute the finalisation step.</li><li>A date and time for when you would like this step to be run.</li></ul>",
          Licensed: false
        },
        {
          Name: "O365CalendarRepairAssistant",
          DisplayName: "Disable Calendar Assistant",
          Description: "Turn off Calendar Assistant in Office 365",
          IsOnPrem: "True",
          Info:
            "<p>Calendar Assistant in Office 365 can break meetings and recurring meetings in Outlook and OWA. We recommend that Calendar Assistant is turned off at the start of any migration. This feature can be turned again on after the migration has completed. There is no negative impact when Calendar Assistant is turned off..</p><b>To configure this step, you need to define:</b><ul><li>The agent which should execute this workflow-step.</li><li>The O365 Credentials (Exchange or Global Admin) which should be used to execute the finalisation step.</li><li>Value - True or False.</li></ul>",
          Licensed: false
        }
      ],
      "User & License": [
        {
          Name: "O365AssignLicense",
          DisplayName: "Assign license",
          Description: "Assign an Office 365 license",
          IsOnPrem: "True",
          Info:
            "This workflow step allows you assign licences to users.<br><br>Configuration for this step includes:<br><b>(1)</b> Selecting the agent that will execute the workflow step <br> <b>(2)</b> Specifying the O365 credential to achieve this step (Global Admin or a User Management Admin) <br><b>(3)</b> Specifying the licence to use <br><b>(4)</b> Specifying usage location (Country code based on ISO 3166  Alpha-2 Code) <br><b>(5)</b> Instruct agent either to use SMTP address instead of UPN or otherwise",
          Licensed: true
        },
        {
          Name: "O365BlockUserLogin",
          DisplayName: "Block login",
          Description: "Preventing a user from logging into the account.",
          IsOnPrem: "True",
          Info:
            "This workflow step allows you to prevent users from accessing their mailbox until migration is complete<br><br>Configuration steps include:<br> <b>(1)</b> Select Agent<br> <b>(2)</b> Select O365 Admin Credential (Global or User Management Admin)<br> <b>(3)</b> Specify which object to use (UPN or Proxy Address)",
          Licensed: true
        },
        {
          Name: "O365RemoveLicense",
          DisplayName: "Remove licenses",
          Description: "Removing licenses from the account.",
          IsOnPrem: "True",
          Info:
            "This workflow allows you to remove the O365 licences associated to an account/s.<br><br>Configuration steps include:<br> <b>(1)</b> Selecting which agent to perform the action<br> <b>(2)</b> Specifying the Office 365 GA credential that will authorise the action",
          Licensed: true
        },
        {
          Name: "ADAddUserToGroup",
          DisplayName: "Add user to AD group",
          Description: "Add user to an AD group",
          IsOnPrem: "True",
          Info:
            "This step allows you to add users to Active Directory security groups for administrative purposes.<br><br>Configuration Steps include:<br><b>(1)</b> Selecting which agent to use<br><b>(2)</b> Selecting the credential to use to authenticate the agent (the on-prem admin credentials)<br><b>(3)</b> Selecting the on-premise security group you would like to add the user to.",
          Licensed: true
        },
        {
          Name: "ADRemoveUserFromGroup",
          DisplayName: "Remove user from AD group",
          Description: "Remove user from an existing AD group",
          IsOnPrem: "True",
          Info:
            "This workflow step removes the user from the Active Directory security group",
          Licensed: true
        }
      ],
      OneDrive: [
        {
          Name: "MigrateHomedriveToOnedrive",
          DisplayName: "Migrate homedrive to OneDrive",
          Description: "Migrate the users homedrive data to OneDrive",
          IsOnPrem: "True",
          Info: "N/A",
          Licensed: true
        },
        {
          Name: "DeleteMigratedHomedriveData",
          DisplayName: "Remove homedrive data",
          Description: "Delete the users migrated data from homedrive",
          IsOnPrem: "True",
          Info: "N/A",
          Licensed: true
        },
        {
          Name: "PreProvisionOneDrive",
          DisplayName: "Pre provision OneDrive",
          Description: "Pre provision OneDrive",
          IsOnPrem: "True",
          Info: "N/A",
          Licensed: true
        },
        {
          Name: "RemoveHomedriveFromAD",
          DisplayName: "Remove homedrive from AD",
          Description:
            "Remove the users home drive entry from Active Directory",
          IsOnPrem: "True",
          Info: "N/A",
          Licensed: true
        },
        {
          Name: "SetHomedriveToReadOnly",
          DisplayName: "Set homedrive readonly",
          Description: "Set the users home drive to read only",
          IsOnPrem: "True",
          Info: "N/A",
          Licensed: true
        }
      ]
    },
    "Archive migration": {
      "Enterprise Vault": [
        {
          Name: "EVDeleteHiddenMessage",
          DisplayName: "Delete hidden message",
          Description:
            "Delete the EV hidden message containing user configuration settings",
          IsOnPrem: "True",
          Info:
            "<p>Delete the EV hidden message from the user's mailbox. This would have been created by EV when the mailbox was first enabled for archiving. OnPrem and O365 credentials are required as OnBoard will check to see if the user's mailbox is OnPrem or in O365.</p><b>To configure this step, you need to define</b><ul><li><b>Agent</b> - Select which OnBoard agent to use</li><li><b>Credentials</b> - Select the appropriate O365 credentials to use</li><li><b>OnPrem CAS Server</b> - Select the appropriate OnPrem Exchange server</li><li><b>OnPrem CAS Credentials</b> - Specify the OnPrem credentials for access to Exchange.</li></ul>",
          Licensed: true
        },
        {
          Name: "EVDisableArchiving",
          DisplayName: "Disable archiving",
          Description: "Disable archiving for a user",
          IsOnPrem: "True",
          Info:
            "Disable archiving for the user so that they can no longer archive new items into EV. This ensures the source archive is static before migrations proceed.<br><br><b>Environment</b> - Select the EV environment to use<br><b>Agent</b> - Select which OnBoard agent to use<br><b>Credentials</b> - Select the appropriate EV credentials to use<br><b>Force</b> - If set to <b>Yes</b>, if EVPM cannot connect to the mailbox being processed e.g. it is already in O365, then we will disable the archive directly in the EV database<br><b>Continue if no archive</b> -  If set to <b>Yes</b>, if no archive is found for the user being processed then the task will complete.",
          Licensed: true
        },
        {
          Name: "EVDisableVirtualVault",
          DisplayName: "Disable virtual vault",
          Description: "Disable virtual vault for a user",
          IsOnPrem: "True",
          Info:
            "Removes  the EV archive view from Outlook.  This would have shown up as an additional archive.<br><br><b>Note</b> - Outlook needs to be restarted for this change to take effect.<br><br><b>Environment</b> - Select the EV environment to use<br><b>Agent</b> - Select which OnBoard agent to use<br><b>Credentials</b> - Select the appropriate EV credentials to use",
          Licensed: true
        },
        {
          Name: "EVDisableOfflineVault",
          DisplayName: "Disable offline vault",
          Description: "Disable offline vault for an user",
          IsOnPrem: "True",
          Info:
            "Disables the offline cache in EV for the user being processed.<br><br><b>Note</b> - Outlook needs to be restarted for this change to take effect.<br><br><b>Agent</b> - Select which OnBoard agent to use<br><b>Credentials</b> - Select the appropriate O365 credentials to use<br><b>OnPrem CAS Server</b> - Select the appropriate OnPrem Exchange server<br><b>OnPrem CAS Credentials</b> - Specify the OnPrem credentials for access to Exchange",
          Licensed: true
        },
        {
          Name: "EVHideEVButtons",
          DisplayName: "Hide buttons",
          Description:
            "Hide the Enterprise Vault interface from within Outlook for a user",
          IsOnPrem: "True",
          Info:
            "Removes the options for the EV Outlook plugin for the user. This is useful once the archive has been moved into Office 365 and the user no longer needs access to the source EV system.<br> OnPrem and O365 credentials are required as OnBoard will check to see if the user's mailbox is OnPrem or in O365.<br><br><b>Note</b> - Outlook needs to be restarted for this change to take effect.<br><br><b>Agent</b> - Select which OnBoard agent to use<br><b>Credentials</b> - Select the appropriate O365 credentials to use<br><b>OnPrem CAS Server </b>- Select the appropriate OnPrem Exchange server<br><b>OnPrem CAS Credentials</b> - Specify the OnPrem credentials for access to Exchange",
          Licensed: true
        },
        {
          Name: "EVZapArchive",
          DisplayName: "ZAP archive",
          Description: "Remove all settings from an archive",
          IsOnPrem: "True",
          Info:
            "Using EVPM, this will disassociate the archive from the mailbox.  When apply this setting it makes the mailbox appear as if it has never been enabled for archiving.",
          Licensed: true
        },
        {
          Name: "EVZapArchivePermissions",
          DisplayName: "ZAP permissions",
          Description: "Remove all permissions from an archive",
          IsOnPrem: "True",
          Info:
            "Using EVPM, all permissions are removed on the archive for the user being processed",
          Licensed: true
        }
      ],
      General: [],
      TransVault: [
        {
          Name: "TVGatherItemsForArchive",
          DisplayName: "Gather archive items",
          Description:
            "Collect detailed meta-data for items associated with an archive",
          IsOnPrem: "False",
          Info:
            "Gathering, the first necessary phase of a migration, is responsible for building a picture of the Source Archive. <br><br> The Gatherer will scan the Source Archive's database (or source files) and collect amongst other information:<ul><li><b>Unique Message Identifiers</b> - uniquely identifying each message in the source system.</li><li><b>Mailboxes/Containers</b> - understanding which mailboxes/containers exist in the source system and the relationship between messages/containers and storage.</li><li><b>Storage Locations</b> - understanding where data is located.</li><li><b>Retention Information</b> - understanding, for some systems, how long the messages are being retained for.</li></ul> Once the Gathering has been run, the Migrator application knows about the mailboxes/messages that exist in the Source Archiving system.",
          Licensed: true
        },
        {
          Name: "TVSyncShortcuts",
          DisplayName: "Sync shortcuts",
          Description:
            "Collect list of shortcuts from a mailbox and note those that have an archived item as well (mark them as synchronized)",
          IsOnPrem: "False",
          Info:
            "Synchronise shortcuts against messages in gathered mailboxes. <br><br> This action is run before migration of messages with the aim to:<ul><li>Ensure that the most up-to-date mailbox structure is recreated in the destination archive.</li><li>Erovide the option to migrate only messages that have shortcuts, or do not have shortcuts.</li></ul>",
          Licensed: true
        },
        {
          Name: "TVMigrateItems",
          DisplayName: "Migrate archive",
          Description:
            "Copy archive items from the source archive to the chosen target",
          IsOnPrem: "False",
          Info:
            "Migration copied data from Source to Target. <br><br> If filters are required, it is at this stage the filter is applied and only data that meets the filter criteria is copied. <br><br> If shortcuts/stubs are in use, at this point the users will have the shortcut and the original message in their target mailbox or in-line archive.",
          Licensed: true
        },
        {
          Name: "TVProcessShortcuts",
          DisplayName: "Process shortcuts",
          Description:
            "Post process shortcuts, E.G. convert, delete, or create",
          IsOnPrem: "False",
          Info:
            "Different operations can be run against shortcuts:<ul><li><b>Conversion of shortcuts</b> - the process of updating shortcut properties to point at the new location of the migrated message.</li><li><b>Deletion of shortcuts</b> - the process of deleting shortcuts from a mail server, either by specified message class or all shortcuts associated with migrated messages.</li><li><b>Creation of shortcuts</b> - the process of creating shortcuts on a mail server for the messages in the scope of this task.</li></ul>",
          Licensed: true
        },
        {
          Name: "TVResolveEVOwner",
          DisplayName: "Resolve EV owner",
          Description:
            "Resolves the owner of an Enterprise Vault Archive via AD",
          IsOnPrem: "True",
          Info:
            "This workflow step enables you to resolve the owner of an Enterprise Vault Archive via AD.",
          Licensed: true
        }
      ]
    }
  };
}

export { getWorkflowToolboxSteps };
