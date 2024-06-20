import * as React from "react";
import {
  Create,
  SimpleForm,
  CreateProps,
  NumberInput,
  TextInput,
} from "react-admin";

export const PostCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <NumberInput step={1} label="authorId" source="authorId" />
        <TextInput label="content" multiline source="content" />
        <TextInput label="title" source="title" />
      </SimpleForm>
    </Create>
  );
};
