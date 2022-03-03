import { useRouter } from 'next/router'
import React from 'react'
import Box from './common/Box'

const Users = () => {
    const router = useRouter()
    return (
        <div>
            <h2>All users</h2>
            <div className="mt-10 grid grid-cols-4 gap-5">
                <Box pointer onClick={() => router.push('/users/1')}>
                    <div className="flex space-x-2">
                        <div className="text-lg font-medium">Id: </div>
                        <div className="text-lg">1</div>
                    </div>
                    <div className="flex space-x-2">
                        <div className="text-lg font-medium">Name: </div>
                        <div className="text-lg">Shahbaz</div>
                    </div>
                    <div className="flex space-x-2">
                        <div className="text-lg font-medium">Email: </div>
                        <div className="text-lg">shahbazrock0321@gmail.com</div>
                    </div>
                </Box>
            </div>
        </div>

    )
}

export default Users