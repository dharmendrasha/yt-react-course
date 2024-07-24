import { BACKEND_API } from '../config'

export const list = async () => {
    const res = await fetch(`${BACKEND_API}`)
    const json = await res.json()
    const arrData = json['data']
    return arrData
}

export const post = async (task) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    await fetch(`${BACKEND_API}/create`, {
        method: 'post',
        body: JSON.stringify({task: task}),
        headers
    })
}

export const get = async (id) => {}

export const put = async (id) => {}

export const del = async (id) => {
    await fetch(`${BACKEND_API}/${id}`, { method: 'delete' })
}