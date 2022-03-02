/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import TextField from './common/textFields/TextField';
import { useLazyQuery } from '@apollo/client';
import { GET_ANIMATIONS } from '../graphql/query/getAnimatons';

const ShowAnimations = () => {
    const [getAnimations, { data, loading }] = useLazyQuery(GET_ANIMATIONS)

    useEffect(() => {
        getAnimations()
    }, [])

    console.log('data', data)

    return (
        <div>
            <div className="py-10">
                <TextField label='Search' name="search" />
            </div>
            <div className='grid grid-cols-2 gap-3'>
                {data?.getAnimations?.map((animation: any) => (
                    <div key={animation.id} className="border min-h-[300px] px-5 py-3">
                        <Player
                            autoplay
                            loop
                            src={animation.path}
                            style={{ height: '200px', width: '200px' }}
                        >
                            <Controls visible={true} buttons={['play', 'repeat', 'frame', 'debug']} />
                        </Player>
                        <div className="mt-5">
                            <div className="flex justify-between">
                                <div className="flex space-x-2">
                                    <div className="text-lg font-medium">Title: </div>
                                    <div className="text-lg">{animation.title}</div>
                                </div>
                                <div className="flex space-x-2">
                                    <div className="text-lg font-medium">User: </div>
                                    <div className="text-lg">{animation.user.name}</div>
                                </div>
                                <div className="flex space-x-2">
                                    <div className="text-lg font-medium">Tag: </div>
                                    <div className="text-lg">{animation.tag.name}</div>
                                </div>
                            </div>
                            <div className="mt-2">
                                <div className="text-lg font-medium">Description</div>
                                {animation.description}
                            </div>
                        </div>
                    </div>

                ))}

            </div>
        </div>
    )
}

export default ShowAnimations