import * as React from "react";
import {
  Create,
  SimpleForm,
  CreateProps,
  TextInput,
  NumberInput,
  DateTimeInput,
} from "react-admin";

export const ProcessedPostCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput label="contentSummary" source="contentSummary" />
        <NumberInput step={1} label="originalPostId" source="originalPostId" />
        <DateTimeInput label="processedAt" source="processedAt" />
      </SimpleForm>
    </Create>
  );
};
