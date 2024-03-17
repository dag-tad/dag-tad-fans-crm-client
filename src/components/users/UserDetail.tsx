import { Button, Card } from 'antd'
import { Link } from 'react-router-dom'


const UserDetail = ({ name, email, phoneNumber }: { name: string, email: string, phoneNumber: string }) => {
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 10, marginTop: 50}}>
      <Link to='/'><Button type='primary'>Back</Button></Link>
      <Card title={name} bordered={false} style={{ width: 300 }}>
        <p>{name}</p>
        <p>Email: {email}</p>
        <p>Phone number: {phoneNumber}</p>
      </Card>
    </div>
  )
}

export default UserDetail
