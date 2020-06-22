import { useState } from 'react';

const useForm = (data = {}) => {
  const [state, setState] = useState(data);

  const handleChange = (event, type = null) => {
    switch (type) {
      case 'date':
        setState({
          ...state,
          [event.target.id]: event.target.value.split('-').join('/'),
        });
        break;
      case 'time':
        setState({
          ...state,
          [event.target.id]: event.target.value.slice(0, 5),
        });
        break;
      case 'currency':
        setState({
          ...state,
          [event.target.id]: event.target.value.replace('-', '/'),
        });
        break;
      default:
        setState({
          ...state,
          [event.target.id]: event.target.value,
        });
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    return state;
  };

  return [
    state,
    handleChange,
    handleSubmit,
    setState,
  ];
};

export default useForm;
