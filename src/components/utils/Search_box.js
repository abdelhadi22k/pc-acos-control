import { useState } from "react";
import { FormControl, InputGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

function Search_box() {

 
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(query ? `/search/?query=${query}` : '/search');
  };

  return (

    <Form className="d-flex me-auto search_Form" onSubmit={submitHandler}>
      <InputGroup>
        <FormControl
          type="text"
          name="q"
          id="q"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="search product..."
          aria-label="Search product..."
          aria-describedby="button-search"
        ></FormControl>
        <Button className='search_color' variant="outline-primary" type="submit" id="button-search">
          <i className="fas fa-search search"></i>
        </Button>
      </InputGroup>
    </Form>
   
  );
}

export default Search_box;