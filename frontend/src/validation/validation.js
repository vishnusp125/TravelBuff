import * as yup from 'yup';

//password rule
const passwordRule = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

//schema
export const userSchema = yup.object().shape({
  fname: yup
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(20)
    .required('Required'),
  lname: yup.string().min(1).max(20).required('Required'),
  dob: yup.date().required('Required'),
  gender: yup.string().required('Required'),
  email: yup.string().email('Please enter a valid email').required('Required'),
  phone: yup
    .number('Phone number must be a 10 digit number')
    .positive()
    .integer()
    .required('Required'),
  password: yup
    .string()
    .min(5, 'password should contain 5-16 characters')
    .max(16, 'password should contain 5-16 characters')
    .matches(passwordRule, 'Please create a stronger password')
    .required('Required'),
  cpassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Password must match')
    .required('Required'),
  weight: yup.number().positive().integer().required('Required'),
  height: yup.number().positive().integer().required('Required'),
});
export const userUpdateSchema = yup.object().shape({
  email: yup.string().email('Please enter a valid email').required('Required'),
  phone: yup
    .number('Phone number must be a 10 digit number')
    .positive()
    .integer()
    .required('Required'),
});

export const guideSchema = yup.object().shape({
  firstName: yup
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(20)
    .required('Required'),
  lastName: yup.string().min(1).max(20).required('Required'),
  location: yup.string().required('Required'),
  email: yup.string().email('Please enter a valid email').required('Required'),
  phone: yup
    .number('Phone number must be a 10 digit number')
    .positive()
    .integer()
    .required('Required'),
  password: yup
    .string()
    .min(5)
    .max(16)
    .matches(passwordRule, 'please Create a stronger password')
    .required('Required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Password must match')
    .required('Required'),
  // image1: yup
  // .mixed()
  // .required('An image is required')
  // .test('fileSize', 'File size must be less than 1MB', (value) => value && value.size <= 1024 * 1024)
  // .test(
  //   'fileType',
  //   'File type must be one of: jpeg, jpg, png, gif',
  //   (value) => value && ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'].includes(value.type)
  // ),
  // image2: yup.mixed().required('Required'),
});





