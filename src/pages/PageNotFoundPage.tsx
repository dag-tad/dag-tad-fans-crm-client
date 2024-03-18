import { Card } from 'antd'
import React from 'react'

function PageNotFoundPage() {
  return (
    <Card title={'Error - 404'} bordered={false} style={{ width: 400, marginTop: 50 }}>
        <h2>Page not found (4004).</h2>
      </Card>
  )
}

export default PageNotFoundPage
