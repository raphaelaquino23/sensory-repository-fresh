import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItem, ListItemText, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

interface UserInformation {
  UserInformation_Id: number;
  UserInformation_Name: string;
  UserType_Id: number;
  UserInformation_Password: string;
  UserInformation_Email: string;
  UserInformation_Description: string;
}

interface Post {
  Post_Id: number;
  PostInformation_Id: number;
  PostStats_Id: number;
  Post_DateCreated: string;
  Post_DateEdited: string;
  User_Id: number;
  Post_DeactivatedStatus: boolean | undefined;
  Post_DeactivatedBy: number;
}

interface PostInformation {
  PostInformation_Id: number;
  PostInformation_Title: string;
  PostInformation_Content: string;
  PostCategory_Id: number;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  listUserPostInformation: PostInformation[];
}

const useStyles = makeStyles({
  dialogPaper: {
    minWidth: "600px",
  },
});

const UserPostsDialog: React.FC<Props> = ({
  isOpen,
  onClose,
  listUserPostInformation,
}) => {
  const classes = useStyles();

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      classes={{
        paper: classes.dialogPaper,
      }}
    >
      <DialogTitle>Posts:</DialogTitle>
      <DialogContent>
        <List>
          {listUserPostInformation.map((postInformation) => (
            <React.Fragment key={postInformation.PostInformation_Id}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={postInformation.PostInformation_Title}
                  secondary={postInformation.PostInformation_Content}
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserPostsDialog;
