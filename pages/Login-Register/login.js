import React, { useState } from 'react';
import '../../assets/css/my-css/login.css';

function Login() {
  const [formData, setFormData] = useState({
    name: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    name: false,
    password: false
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
      password: formData.password === ''
    };

    setErrors(newErrors);

    if (!newErrors.name && !newErrors.password) {
      alert('Başarıyla giriş yapıldı');
    }
  };

  return (
    <div className="login-container">
      <h2>Giriş Yap</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="name">Kullanıcı Adı:</label>
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
        <button type="submit" className="btn">Giriş Yap</button>
      </form>
    </div>
  );
}

export default Login;
