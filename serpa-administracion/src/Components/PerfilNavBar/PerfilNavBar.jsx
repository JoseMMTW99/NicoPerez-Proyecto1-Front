import React from 'react'

function PerfilNavBar() {
  return (
    <>
        <div style={{ backgroundColor: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', padding: 5 }}>
            <div style={{ backgroundColor: '#74BCAC', borderRadius: '50%', width: 50, height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={profileImage} style={{ width: 40, height: 40, borderRadius: '50%' }} alt="Profile" />
            </div>
            <div style={{ marginLeft: 10 }}>{username}</div>
        </div>
    </>
  )
}

export default PerfilNavBar