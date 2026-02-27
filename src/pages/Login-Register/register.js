import React, { useState } from 'react';
import '../../assets/css/my-css/register.css';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    phone: ''
  });

  const [errors, setErrors] = useState({
    name: false,
    password: false,
    phone: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      name: formData.name === '',
      password: formData.password === '',
      phone: formData.phone === ''
    };

    setErrors(newErrors);

    if (!newErrors.name && !newErrors.password && !newErrors.phone) {
      alert('Başarıyla kayıt oldunuz');
    }
  };

  return (
    <div className="register-container">
      <h2>Kayıt Ol</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="name">Ad:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'error' : ''}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Parola:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? 'error' : ''}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="phone">Telefon Numarası:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={errors.phone ? 'error' : ''}
            required
          />
        </div>
        <button type="submit" className="btn">Kayıt Ol</button>
      </form>
    </div>
  );
}

export default Register;
