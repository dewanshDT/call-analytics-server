import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"

export const BASE_API_URL = "http://localhost:3000"

export const useGetCalls = () => {
  const queryKey = ["calls-all"]

  return useQuery({
    queryKey: queryKey,
    queryFn: () =>
      fetch(`${BASE_API_URL}/api/recordings`).then((res) => res.json()),
  })
}

export const useGetCallById = (id) => {
  return useQuery({
    queryKey: [`call-${id}`],
    queryFn: () =>
      fetch(`${BASE_API_URL}/api/recordings/${id}`).then((res) => res.json()),
  })
}

export const useDeleteCallById = (id) => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  return useMutation({
    mutationKey: [`delete-call-${id}`],
    mutationFn: () =>
      fetch(`${BASE_API_URL}/api/recordings/${id}`, { method: "DELETE" })
        .then((res) => res.json())
        .catch((e) => console.log(e)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["calls-all"] })
      navigate("/calls/")
    },
  })
}

/**
 * @typedef {Object} Token
 * @property {string} value - The token value.
 */

/**
 * @typedef {Object} ApiResponse
 * @property {number} statusCode - The status code of the response.
 * @property {string} message - The message from the response.
 * @property {boolean} success - Whether the request was successful.
 * @property {*} data - The data from the response.
 */

/**
 * Fetch data from the specified URL.
 * @param {string} url - The URL to fetch data from.
 * @param {Token} [token] - Optional token for authorization.
 * @returns {Promise<ApiResponse|undefined>} - The response data or undefined in case of an error.
 */
const fetcher = async (url, token) => {
  if (token) {
    checkRefresh(token)
  }
  try {
    const customHeaders = new Headers()
    customHeaders.append("Content-Type", "application/json")
    if (token?.value) {
      customHeaders.append("Authorization", `Bearer ${token?.value}`)
    }
    const res = await fetch(url, {
      headers: customHeaders,
    })

    if (!res.ok) {
      throw new Error(res.statusText)
    }

    const { data: resData, statusCode, message, success } = await res.json()

    return {
      statusCode: statusCode,
      message: message,
      success: success,
      data: resData,
    }
  } catch (e) {
    console.error(`this is from fetcher\n${e}`)
    return undefined
  }
}

/**
 * Send JSON data to the specified URL.
 * @param {string} url - The URL to send data to.
 * @param {*} data - The JSON data to send.
 * @param {Token} [token] - Optional token for authorization.
 * @param {string} [method='POST'] - The HTTP method for the request.
 * @returns {Promise<ApiResponse|undefined>} - The response data or undefined in case of an error.
 */
const sendJsonData = async (url, data, token, method = "POST") => {
  if (token) checkRefresh(token)
  try {
    const customHeaders = new Headers()
    customHeaders.append("Content-Type", "application/json")
    customHeaders.append("Authorization", `Bearer ${token?.value}`)

    const response = await fetch(url, {
      method: method,
      headers: customHeaders,
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(await response.json())
    }

    const {
      data: resData,
      statusCode,
      message,
      success,
    } = await response.json()

    return {
      statusCode: statusCode,
      message: message,
      success: success,
      data: resData,
    }
  } catch (e) {
    console.error(`from sendJsonData\n${e}`)
  }
}
