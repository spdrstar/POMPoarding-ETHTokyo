import { Form } from "@quillforms/renderer-core";
import "@quillforms/renderer-core/build-style/style.css";
import { registerCoreBlocks } from "@quillforms/react-renderer-utils";

registerCoreBlocks();
const Onboarding = () => {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Form
        formId="1"
        formObj={{
          blocks: [
            {
              name: "short-text",
              id: "name",
              attributes: {
                required: true,
                label: "Let's start with your name"
              }
            },
            {
              name: "short-text",
              id: "orgname",
              attributes: {
                required: true,
                label:
                  "Great {{field:name}}, what is the name of the community you lead?"
              }
            },
            {
              name: "multiple-choice",
              id: "orgtype",
              attributes: {
                required: true,
                multiple: false,
                verticalAlign: false,
                label: "Select the category that best fits {{field:orgname}}",
                choices: [
                  {
                    label: "Company",
                    value: "company"
                  },
                  {
                    label: "School",
                    value: "school"
                  },
                  {
                    label: "DAO",
                    value: "dao"
                  },
                  {
                    label: "Club",
                    value: "club"
                  },
                  {
                    label: "Online community",
                    value: "online community"
                  },
                  {
                    label: "Other",
                    value: "other"
                  }
                ]
              }
            },

            {
              name: "long-text",
              id: "oneliner",
              attributes: {
                required: true,
                label: "Describe {{field:orgname}} in one sentence"
              }
            },
            {
              name: "short-text",
              id: "color",
              attributes: {
                required: true,
                label: "What is the best color to represent {{field:orgname}}?"
              }
            },
            {
              name: "file-upload",
              id: "234567",
              attributes: {
                required: true,
                label: "Please upload a logo of your community",
                accept: "image/svg+xml,image/png,image/jpeg"
              }
            },
            {
              name: "email",
              id: "adminemail",
              attributes: {
                required: false,
                label:
                  "Enter the email of other admins so that they'll get access to the admin account. "
              }
            },
            {
              name: "multiple-choice",
              id: "allowedtoaddmembers",
              attributes: {
                required: true,
                multiple: false,
                verticalAlign: true,
                label: "Who is allowed to add and remove members?",
                choices: [
                  {
                    label: "All admin",
                    value: "all"
                  },
                  {
                    label: "Select admin only",
                    value: "select"
                  },
                  {
                    label: "Myself only",
                    value: "myself"
                  },
                  {
                    label: "Set up custom rules later",
                    value: "custom"
                  }
                ]
              }
            },
            {
              name: "multiple-choice",
              id: "allowedtoaddadmin",
              attributes: {
                required: true,
                multiple: false,
                verticalAlign: true,
                label:
                  "How will admin be added or removed after account set-up?",
                choices: [
                  {
                    label: "Receive majority approval by admin",
                    value: "majoritybyadmin"
                  },
                  {
                    label: "Receive majority approval by members",
                    value: "majoritybymembers"
                  },
                  {
                    label: "Only decided by me",
                    value: "myself"
                  },
                  {
                    label: "Set up custom rules later",
                    value: "custom"
                  }
                ]
              }
            },
            {
              name: "website",
              id: "bv91em9123",
              attributes: {
                required: true,
                multiple: true,
                label: "Please insert your website url!"
              }
            },
            {
              name: "statement",
              id: "end",
              attributes: {
                label:
                  "Great, you're all set! Submit and we'll create {{field:orgname}}'s community account",
                buttonText: "Continue",
                quotationMarks: true
              }
            }
          ],
          settings: {
            animationDirection: "horizontal",
            disableWheelSwiping: false,
            disableNavigationArrows: false,
            disableProgressBar: false
          },
          theme: {
            font: "Manrope",
            buttonsBgColor: "#FE9800",
            logo: {
              src: ""
            },
            questionsColor: "#000",
            answersColor: "#E07015",
            buttonsFontColor: "#fff",
            buttonsBorderRadius: 25,
            errorsFontColor: "#fff",
            errorsBgColor: "#f00",
            progressBarFillColor: "#E07015",
            progressBarBgColor: "#ccc"
          }
        }}
        onSubmit={(data, { completeForm, setIsSubmitting }) => {
          setTimeout(() => {
            setIsSubmitting(false);
            completeForm();
          }, 500);
        }}
      />
    </div>
  );
};

export default Onboarding;
