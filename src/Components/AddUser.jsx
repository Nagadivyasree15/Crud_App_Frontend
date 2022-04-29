import {
  FormControl,
  FormGroup,
  InputLabel,
  Input,
  Button,
  makeStyles,
  Typography,
  Box,
  IconButton,
  Dialog,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import { useEffect, useState } from 'react';
import { addUser } from '../Service/api';
import { useNavigate } from 'react-router-dom';

const useStyle = makeStyles({
  container: {
    width: '50%',
    margin: '5% 0 0 25%',
    '&>*': {
      marginTop: 20,
    },
  },
});

const initialValues = {
  name: '',
  username: '',
  email: '',
  phone: '',
};
const AddUser = () => {
  const [user, setUser] = useState(initialValues);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState();
  const [alertType, setAlertType] = useState();
  const [userAlert, setUserAlert] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const { name, username, email, phone } = user;
  const classes = useStyle();
  const navigate = useNavigate();
  const onValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const addUserDetails = async () => {
    if (Object.keys(validate(user)).length === 0) {
      await addUser(user);
      navigate('/');
    } else {
      setUserAlert(!userAlert);
    }
  };

  useEffect(() => {}, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const regexPhone = /^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[789]\d{9}$/;
    if (!values.name) {
      errors.name = 'Name is required';
    }
    if (!values.username) {
      errors.username = 'Username is required';
    }
    if (!values.email) {
      errors.email = 'Email is required!';
    } else if (!regex.test(values.email)) {
      errors.email = 'This is not a valid email format!';
    }
    if (!values.phone) {
      errors.phone = 'Phone number is required';
    } else if (values.phone) {
      if (regexPhone.test(values.phone)) {
        values.phone = Number(values.phone);
      } else errors.phone = 'invalid phone number';
    }
    return errors;
  };
  const checkValidation = () => {
    setFormErrors(validate(user));
    if (Object.keys(validate(user)).length === 0) {
      setAlertMessage('User verified successfully');
      setAlertType('success');
      setShowAlert(!showAlert);
    } else {
      setAlertMessage('Invalid user');
      setAlertType('error');
      setShowAlert(!showAlert);
    }
  };
  return (
    <FormGroup className={classes.container}>
      <Typography variant="h4">Add User</Typography>
      <FormControl>
        <InputLabel>Name</InputLabel>
        <Input onChange={(e) => onValueChange(e)} name="name" value={name} />
      </FormControl>
      <p style={{ color: 'red' }}>{formErrors.name}</p>
      <FormControl>
        <InputLabel>Username</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="username"
          value={username}
        />
        <p style={{ color: 'red' }}>{formErrors.username}</p>
      </FormControl>
      <FormControl>
        <InputLabel>Email</InputLabel>
        <Input onChange={(e) => onValueChange(e)} name="email" value={email} />
        <p style={{ color: 'red' }}>{formErrors.email}</p>
      </FormControl>
      <FormControl>
        <InputLabel>Phone</InputLabel>
        <Input onChange={(e) => onValueChange(e)} name="phone" value={phone} />
        <p style={{ color: 'red' }}>{formErrors.phone}</p>
      </FormControl>
      <FormControl>
        <Box display="flex" justifyContent="space-between">
          <Button
            variant="outlined"
            color="primary"
            style={{ width: '45%' }}
            onClick={() => checkValidation()}
          >
            Validate
          </Button>
          <Dialog open={showAlert}>
            <Alert severity={alertType}>
              {alertMessage}
              <IconButton aria-label="close" onClick={() => checkValidation()}>
                <CloseIcon />
              </IconButton>
            </Alert>
          </Dialog>
          <Button
            variant="contained"
            color="primary"
            size="medium"
            style={{ width: '45%' }}
            onClick={() => addUserDetails()}
          >
            Add User
          </Button>
          <Dialog open={userAlert}>
            <Alert severity="warning">
              Please check the user details
              <IconButton aria-label="close" onClick={() => addUserDetails()}>
                <CloseIcon />
              </IconButton>
            </Alert>
          </Dialog>
        </Box>
      </FormControl>
    </FormGroup>
  );
};
export default AddUser;
