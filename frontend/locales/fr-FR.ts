export default {
    common: {
        title: "Obaluaye",
    },
    nav: {
        home: "Home",
        search: "Search",
        pathways: "Pathways",
        comments: "Comments",
        groups: "Groups",
        settings: "Settings",
        about: "About",
        privacy: "Privacy",
        contact: "Contact",
        authentication: "Authentication",
        blog: "Blog",
    },
    header: {
        edit: "Edit",
        save: "Save",
        saving: "Saving",
        reset: "Reset",
        delete: "Delete",
        cancel: "Cancel",
    },
    footer: {
        rights: "All rights reserved."
    },
    authentication: {
        roles: {
            custodian: "Custodian",
            curator: "Curator",
            researcher: "Researcher",
            viewer: "Viewer",
        },
    },
    settings: {
        name: "Settings",
        description: "Update your personal settings, or delete your account.",
        nav: {
            profile: "Profile",
            account: "Account",
            invitations: "Invitations",
            security: "Security",
            moderation: "Moderation",
        },
        account: {
            title: "Personal settings",
            description: "Changing your email address will change your login. Any changes will require you to enter your original password.",
            passwordRequired: "You will need to set a password ('Security') before you can save your profile changes.",
            accountPassword: "Original password",
            profileName: "Your name",
            email: "Email address",
            submit: "Submit",
        },
        invitations: {
            title: "Group invitations",
            description: "Accept or reject invitations to join research groups.",
            completePathway: "You cannot participate in groups until you have completed a personal pathway.",
            invited: "Invited",
            for: "For",
            by: "By",
            accept: "Accept",
            reject: "Reject",
        },
        security: {
            title: "Security",
            description: "Secure your account by adding a password, or enabling two-factor security. Or both.",
            passwordRequired: "Any changes will require you to enter your original password.",
            totpOffer: "Secure your account further by enabling two-factor security.",
            accountPassword: "Original password",
            useTotp: "Use two-factor security",
            useTotpSetting: "Use TOTP settings",
            new: "New password",
            repeat: "Repeat new password",
            enableTotp: "Enable two-factor security",
            totpHelp1: "Download an authenticator app that supports Time-based One-Time Password (TOTP) for your mobile device.",
            totpHelp2Scan: "Open the app and scan the QR code below to pair your mobile with your account.",
            totpHelp2Type: "If you can't scan, you can type in the following key:",
            totpHelp3: "Enter the code generated by your Authenticator app below to pair your account:",
            totpHelp3Code: "6-digit verification code",
            cancel: "Cancel",
        },
        moderation: {

        },
    },
    start: {
        pathwayTitle: "Pathways",
        pathwayDescription: "View a list of pathways you can start.",
        groupTitle: "Groups",
        groupDescription: "Join or start a group",
        commentTitle: "Comments",
        commentDescription: "See activity in your groups",
        personalTitle: "Complete a personal pathway",
        personalDescription: "Once complete, you can join groups and start a research pathway",
    },
    filter: {
        filter: "Filter",
        filters: "Filters",
        clear: "Clear",
        search: "Search",
        refresh: "Refresh filters",
        dates: "Date range",
        to: "to",
    },
    multi: {
        untagged: "untagged",
        previous: "Previous",
        next: "Next",
    },
    group: {
        name: "Group",
        new: "New group",
        empty: "Nothing right now. Create a group to see them here.",
        emptyIncomplete: "Once you complete a personal pathway, you can participate in groups.",
        create: "Create a group",
        creating: "Creating group",
        updating: "Updating group",
        field: {
            title: "Title",
            description: "Description",
            subjects: "Subjects",
            country: "Country",
            spatial: "Spatial",
            language: "Language",
        },
        nav: {
            metadata: "Metadata",
            members: "Members",
            invitations: "Invitations",
        },
        members: {
            since: "Since",
            name: "Name",
            email: "Email",
            responsibility: "Responsibility",
            remove: "Remove",
        },
        roles: {
            viewer: "Viewer",
            researcher: "Researcher",
            curator: "Curator",
            custodian: "Custodian",
        },
        invitations: {
            note: "Note: you must email this person so they know what this is for",
            placeholder: "Invite user by email",
            invite: "Invite",
        },
        help: {
            title: "",
            description: "A complete description of the group.",
            subjects: "A list of topics for the group. Comma-separated.",
            country: "A list of one or more countries appropriate to this group.",
            spatial: "Spatial characteristics of the group.",
            language: "Specify group communication language.",
        },
        alert: {
            saveErrorTitle: "Save error",
            saveErrorContent: "Group failed to save. Please check your details, or internet connection, and try again.",
            removeErrorTitle: "Deletion error",
            removeErrorContent: "Could not remove group. Please check your details, or internet connection, and try again.",
        },
    },
    pathway: {
        name: "Pathway",
        new: "New pathway",
        empty: "Nothing right now. Create some pathways to see them here.",
        create: "Create a pathway",
        creating: "Creating pathway",
        updating: "Updating pathway",
        translate: "Translating",
        metadata: "Metadata",
        publish: "Publish",
        unpublish: "Unpublish",
        download: "Download",
        upload: "Upload",
        field: {
            title: "Title",
            type: "Type",
            description: "Description",
            subjects: "Subjects",
            country: "Country",
            spatial: "Spatial",
            temporal: "Temporal range",
            language: "Language",
            citation: "Bibliographic citation",
        },
        types: {
            personal: "Personal",
            research: "Research",
        },
        help: {
            title: "",
            description: "A complete description of the pathway.",
            subjects: "A list of topics of the pathway. Comma-separated. Contains all languages.",
            country: "A list of one or more countries appropriate to this pathway.",
            spatial: "Spatial characteristics of the pathway.",
            temporal: "Temporal range of the pathway.",
            language: "Specify pathway base language. Permits translation.",
            citation: "A bibliographic reference for the pathway.",
        },
        alert: {
            saveErrorTitle: "Save error",
            saveErrorContent: "Pathway failed to save. Please check your details, or internet connection, and try again.",
            removeErrorTitle: "Deletion error",
            removeErrorContent: "Could not remove pathway. Please check your details, or internet connection, and try again.",
            toggleSuccessTitle: "Toggle success",
            toggleSuccessContent: "Publication state successfully changed.",
        },
    },
    theme: {
        name: "Theme",
        new: "New theme",
        field: {
            title: "Title",
            description: "Description",
            subjects: "Subjects",
            country: "Country",
            spatial: "Spatial",
            language: "Language",
        },
        help: {
            title: "",
            description: "A complete description of the theme.",
            subjects: "A list of topics of the theme. Comma-separated. Contains all languages.",
            country: "A list of one or more languages appropriate to this theme.",
            spatial: "Spatial characteristics of the theme.",
        },
    },
    node: {
        name: "Node",
        new: "New node",
        field: {
            question: "Question",
            subjects: "Subjects",
        },
        help: {
            question: "",
            subjects: "A list of topics of the node. Comma-separated. Contains all languages.",
        },
    },
    form: {
        name: "Form type",
        new: "Add term",
        required: "Required",
        randomise: "Randomise",
        select: "Select",
        terms: {
            name: "Terms",
            value: "Value",
        },
        types: {
            value: "Value",
            valuerange: "Value range",
            scale: "Scale",
            boolean: "Boolean",
            selectone: "Select one",
            selectmany: "Select many",
            selectbranch: "Select branch",
            upload: "Upload",
        },
        responsevalue: "Response data type",
        scaleTo: "to",
        scaleLabel: "Label (optional)",
        branchNone: "Add a theme to branch",
        booleanTrue: "True",
        booleanFalse: "False",
        uploadText: "Upload your response.",
        valueText: "Respond with a",
        values: {
            date: "Date",
            datetime: "DateTime",
            year: "Year",
            number: "Number",
            integer: "Integer",
            boolean: "Boolean",
            array: "Array",
            string: "String",
        },
        constraints: {
            dtype: "Data type",
            limit: "Limit",
            range: "Range",
            minimum: "Minimum",
            maximum: "Maximum",
        },
        example: "Example",
    },
    resource: {
        name: "Resource",
        download: "Download",
        upload: "Upload",
        new: "Add a resource",
        store: "Store",
        cancel: "Cancel",
        types: {
            markdown: "MarkDown",
            download: "Download",
            weblink: "Web link",
        },
        field: {
            title: "Title",
            type: "Type",
            description: "Description",
            content: "Content",
        },
    },
    pwa: {
        dismiss: "Dismiss",
        install: "Install",
        install_title: "Install Base App",
        title: "New Base App update available!",
        update: "Update",
        update_available_short: "Update Base App",
    },
}