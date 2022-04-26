import {
  FormControl,
  FormGroup,
  InputLabel,
  Input,
  Button,
  makeStyles,
  Typography,
} from '@material-ui/core';
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
  const [formErrors, setFormErrors] = useState({});
  const { name, username, email, phone } = user;
  const classes = useStyle();
  const navigate = useNavigate();
  const onValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const addUserDetails = async () => {
    setFormErrors(validate(user));
    if (Object.keys(validate(user)).length === 0) {
      setFormErrors(validate(user));
      await addUser(user);
      navigate('/');
    }
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0) {
    }
  }, [formErrors]);

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
        <Button
          variant="contained"
          color="primary"
          onClick={() => addUserDetails()}
        >
          Add User
        </Button>
      </FormControl>
    </FormGroup>
  );
};
export default AddUser;
