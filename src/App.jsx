import React, { useState } from 'react';
import { TextField, Stack, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import Form from 'react-bootstrap/Form';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    mobile: '',
    gender: '',
    course: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Mobile number must be 10 digits';
    }

    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }

    if (!formData.course) {
      newErrors.course = 'Please select a course';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      // No errors, form is valid
      alert(`Data stored successfully:\n
      Name: ${formData.name}\n
      Address: ${formData.address}\n
      Email: ${formData.email}\n
      Mobile: ${formData.mobile}\n
      Gender: ${formData.gender}\n
      Course: ${formData.course}`);
    } else {
      setErrors(validationErrors);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      address: '',
      email: '',
      mobile: '',
      gender: '',
      course: ''
    });
    setErrors({});
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div style={{ width: '500px' }} className='border p-4 rounded bg-light shadow'>
        <h2 className='text-center mb-4'>Registration Form</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            id="name-input"
            label="Name"
            variant="outlined"
            className='w-100 mb-3'
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            id="address-input"
            label="Address"
            variant="outlined"
            className='w-100 mb-3'
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          <TextField
            id="email-input"
            label="Email"
            variant="outlined"
            className='w-100 mb-3'
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            id="mobile-input"
            label="Mobile"
            variant="outlined"
            className='w-100 mb-3'
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            error={!!errors.mobile}
            helperText={errors.mobile}
          />

          <FormControl className='w-100 mb-3' error={!!errors.gender}>
            <FormLabel id="gender-label">Gender</FormLabel>
            <RadioGroup
              aria-labelledby="gender-label"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="other" control={<Radio />} label="Other" />
            </RadioGroup>
            {errors.gender && <p className="text-danger">{errors.gender}</p>}
          </FormControl>

          <Form.Select
            aria-label="Default select example"
            className='w-100 mb-3 bg-transparent border border-dark rounded'
            name="course"
            value={formData.course}
            onChange={handleChange}
          >
            <option value="">Courses</option>
            <option value="1">Biology Science</option>
            <option value="2">Commerce</option>
            <option value="3">Computer Science</option>
            <option value="4">Humanities</option>
          </Form.Select>
          {errors.course && <p className="text-danger">{errors.course}</p>}

          <Stack spacing={2} direction="row" className='w-100'>
            <Button type="submit" className='px-3 py-2 w-100 bg-success' variant="contained">
              Register
            </Button>
            <Button type="button" className='px-3 py-2 w-100 bg-dark text-white' variant="outlined" onClick={handleReset}>
              Reset
            </Button>
          </Stack>
        </form>
      </div>
    </div>
  );
}

export default App;
