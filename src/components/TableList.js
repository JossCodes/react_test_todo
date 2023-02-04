import axios from "axios";
import { useEffect, useState } from "react";
import { BsCheckLg, BsXLg } from "react-icons/bs";
import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Pagination,
  Row,
  Table,
} from "react-bootstrap";
import { paginate } from "../utils";

const TableList = () => {
  const [fullTodos, setFullTodos] = useState([]);
  const [todos, setTodos] = useState([]);
  const [page, setPage] = useState(1);
  const [paginationItems, setPaginationItems] = useState(1);

  const getTodos = async () => {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );
    setFullTodos(paginate(data));
  };

  useEffect(() => {
    getTodos();
  }, []);

  useEffect(() => {
    if (fullTodos.length > 0) {
      setTodos(fullTodos[page - 1]);
      let items = [];
      for (let number = 1; number <= fullTodos.length; number++) {
        items.push(
          <Pagination.Item key={number} active={number === page}>
            {number}
          </Pagination.Item>
        );
      }
      setPaginationItems(items);
    }
  }, [fullTodos, page]);

  return (
    <Container>
      <Row>
        <Col>
          <Button variant="dark" className="d-block me-0 ms-auto my-3">
            Refresh
          </Button>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Describe Todo"
              aria-label="Describe Todo"
              aria-describedby="basic-addon2"
            />
            <Button variant="outline-secondary" id="button-addon2">
              Create
            </Button>
          </InputGroup>
          <Table striped bordered hover responsive width={"100%"}>
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Description</th>
                <th>Completed</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo) => (
                <tr key={todo.id}>
                  <td>{todo.id}</td>
                  <td>{todo.userId}</td>
                  <td>{todo.title}</td>
                  <td>{todo.completed ? <BsCheckLg /> : <BsXLg />}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination>{paginationItems}</Pagination>
        </Col>
      </Row>
    </Container>
  );
};

export default TableList;
