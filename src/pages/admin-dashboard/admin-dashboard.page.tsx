import { useContext } from "react";
import { Input, Form, Button, Tabs } from "antd";
import axios from "axios";
import "./admin-dashboard.scss";
import { AuthContext } from "../../state/reducer";
import { ICreateAdmin } from "../../types/responses";

const { TabPane } = Tabs;

type FormValues = {
  username: string;
  password: string;
  email: string;
}

function AdminDashboard() {
  const { token } = useContext(AuthContext);

  const handleCreateUser = (values: FormValues) => {
    const { username, email, password } = values;

    axios
      .post<ICreateAdmin>(
        "/admin",
        {
          username,
          email,
          password,
          isAdmin: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };


  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard-body">
        <h2>Admin Dashboard</h2>
      </div>
      <hr />
      <div className="admin-dashboard-header">
        <Tabs defaultActiveKey="statistics" tabPosition="left">
          <TabPane tab="Statistics" key="statistics">
            <h1>Statistics</h1>
          </TabPane>
          <TabPane tab="Classes Management" key="class-management">
            <h1>Classes Management</h1>
          </TabPane>
          <TabPane
            tab={
              <span>
                Create Admin User
              </span>
            }
            key="create-admin-user"
          >
            <div className="admin-dashboard-create-user-form">
              <Form layout="vertical" onFinish={handleCreateUser}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      type: "email",
                      message: "Please enter a valid email address",
                    },
                    {
                      required: true,
                      message: "Please enter an email address",
                    },
                  ]}
                >
                  <Input placeholder="Email" size="large" />
                </Form.Item>
                <Form.Item
                  name="username"
                  label="Username"
                  rules={[
                    {
                      required: true,
                      message: "Please enter a username",
                    },
                  ]}
                >
                  <Input placeholder="Username" size="large" />
                </Form.Item>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: "Please enter a password",
                    },
                  ]}
                >
                  <Input.Password placeholder="Password" size="large" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Create User
                  </Button>
                  <Button danger>
                    {/* TODO: handle this */}
                    Cancel
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default AdminDashboard;
