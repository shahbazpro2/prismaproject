import React from 'react'
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import Button from './buttons/Button';
import DangerButton from './buttons/DangerButton';
import { useRouter } from 'next/router';
import axios from 'axios';

const AnimationCards = ({ animations }: any) => {
    const router = useRouter()

    const deleteAnimaiton = async (id: number) => {

        axios.delete(`/api/animation?id=${id}`)
            .then(res => {
                console.log('res', res)
                window.location.reload()
            })
            .catch(err => console.log(err))

    }

    return (
        <div className='grid grid-cols-4 gap-3'>
            {animations?.map((animation: any) => (
                <div key={animation?.id} className="border min-h-[300px] px-5 py-3">
                    <Player
                        autoplay
                        loop
                        src={`/uploads/${animation?.path}`}
                        style={{ height: '200px', width: '200px' }}
                    >
                        <Controls visible={true} buttons={['play', 'repeat', 'frame', 'debug']} />
                    </Player>
                    <div className="mt-5">
                        <div className="flex justify-between">
                            <div className="flex space-x-2">
                                <div className="text-lg font-medium">Title: </div>
                                <div className="text-lg">{animation?.title}</div>
                            </div>
                            <div className="flex space-x-2">
                                <div className="text-lg font-medium">User: </div>
                                <div className="text-lg">{animation?.user?.name}</div>
                            </div>
                        </div>
                        <div className="flex space-x-2 mt-3">
                            <div className="text-lg font-medium">Tag: </div>
                            <div className="text-lg">{animations[0]?.TagOnAnimation?.map((tag: any) => tag.tag.name).toString()}</div>
                        </div>
                        <div className="mt-2">
                            <div className="text-lg font-medium">Description</div>
                            {animation?.description}
                        </div>
                        {router.asPath !== '/' &&
                            <div className="mt-5 flex justify-between space-x-5">
                                <Button>Edit</Button>
                                <DangerButton onClick={() => deleteAnimaiton(animation?.id)}>Delete</DangerButton>
                            </div>}
                    </div>
                </div>

            ))}

        </div>
    )
}

export default AnimationCards