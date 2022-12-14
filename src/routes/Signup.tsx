import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, CircularProgress, Container, TextField, Typography } from '@mui/material';
import banner from '../assets/NEAR_GCash.png';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { AsYouTypeFormatter, PhoneNumberFormat as PNF, PhoneNumberUtil } from 'google-libphonenumber';

const phoneUtil = PhoneNumberUtil.getInstance();

// Format a (possibly incomplete) phone number
const formatPhoneNumber = (phone: string, country: string) => {

  // Remove non-numeric digits as they seem to confuse the formatter.
  let phoneNumber = phone.replace(/[^0-9]/g, '');

  const formatter = new AsYouTypeFormatter(country);
  formatter.clear();
  let formattedPhoneNumber = '';
  for (let digit of phoneNumber) {
    formattedPhoneNumber = formatter.inputDigit(digit);
  }

  return formattedPhoneNumber;
};

enum Form {
  PHONE = 'phone',
  FIRSTNAME = 'firstName',
  LASTNAME = 'lastName',
  NEAR_SUBACCOUNT = 'nearSubaccount',
}

const Signup = () => {
  const navigate = useNavigate();

  const country = 'PH';

  // Configure Formik to handle form submission
  const initialValues: { [key in Form]: string } = {
    phone: '', firstName: '', lastName: '', nearSubaccount: ''
  };
  const yupSchemaObject: { [key in Form]: yup.StringSchema } = {
    firstName: yup.string().required('First name is required'),
    lastName:  yup.string().required('Last name is required'),
    phone:     yup.string().required('Phone number is required')
      .test('valid phone number', 'Invalid phone number', value => {
        if (!value || value.length < 2) return false;

        const number = phoneUtil.parse(value, country);
        return phoneUtil.isValidNumber(number);
      }),
    nearSubaccount:  yup.string().required('NEAR account name is required'),
  };
  const formik = useFormik({
    initialValues,
    validationSchema: yup.object(yupSchemaObject),
    onSubmit: async (values) => {
      const phone = phoneUtil.parse(values.phone, country);
      const phoneE164 = phoneUtil.format(phone, PNF.E164);

      // TODO: Submit to API
      console.log(values);
      console.log(phoneE164);
      await new Promise(resolve => setTimeout(resolve, 3000));
      navigate(`/account/${phoneE164}/otp`);
    },
  });

  return (
    <>
      <img src={banner} alt="brand logo" width="100%" />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="body1" align="center" gutterBottom component="div">
            Sign up to get a NEAR deposit account connected to your GCash wallet!
            <br />
            NEAR tokens sent will be deposited as pesos in your GCash account.
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1, width: '100%' }}>
            <TextField
              label="Phone Number (+63) *"
              type="tel"
              autoComplete="tel-national"
              name={Form.PHONE}
              margin="normal"
              autoFocus
              fullWidth
              value={formik.values.phone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const formattedPhoneNumber = formatPhoneNumber(e.target.value, country);
                formik.setFieldValue(Form.PHONE, formattedPhoneNumber);
              }}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
            <TextField
              label="First Name *"
              type="text"
              autoComplete="given-name"
              name={Form.FIRSTNAME}
              margin="normal"
              fullWidth
              value={formik.values.firstName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                formik.setFieldValue(Form.FIRSTNAME, e.target.value);
              }}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
            <TextField
              label="Last Name *"
              type="text"
              autoComplete="family-name"
              name={Form.LASTNAME}
              margin="normal"
              fullWidth
              value={formik.values.lastName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                formik.setFieldValue(Form.LASTNAME, e.target.value);
              }}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
            <TextField
              label="NEAR Account Name *"
              type="text"
              name={Form.NEAR_SUBACCOUNT}
              margin="normal"
              fullWidth
              value={formik.values.nearSubaccount}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                formik.setFieldValue(Form.NEAR_SUBACCOUNT, e.target.value);
              }}
              error={formik.touched.nearSubaccount && Boolean(formik.errors.nearSubaccount)}
              helperText={formik.touched.nearSubaccount && formik.errors.nearSubaccount}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={formik.isSubmitting}
              sx={{ mt: 3, mb: 2 }}
            >
              {formik.isSubmitting ? <CircularProgress size={24} color="info" /> : 'Sign Up'}
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Signup;