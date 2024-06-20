import * as React from "react";
import {
  Edit,
  SimpleForm,
  EditProps,
  TextInput,
  NumberInput,
  DateTimeInput,
} from "react-admin";

export const ProcessedPostEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput label="contentSummary" source="contentSummary" />
        <NumberInput step={1} label="originalPostId" source="originalPostId" />
        <DateTimeInput label="processedAt" source="processedAt" />
      </SimpleForm>
    </Edit>
  );
};
