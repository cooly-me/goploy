import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/user/info',
    method: 'get'
  })
}

/**
 * @param  {object} pagination
 * @return {Promise}
 */
export function getList(pagination) {
  return request({
    url: '/user/getList',
    method: 'get',
    params: {
      ...pagination
    }
  })
}

/**
 * @return {Promise}
 */
export function getOption() {
  return request({
    url: '/user/getOption',
    method: 'get'
  })
}

/**
 * @return {Promise}
 */
export function getCanBindProjectUser() {
  return request({
    url: '/user/getCanBindProjectUser',
    method: 'get'
  })
}

/**
 * @param  {string} account
 * @param  {string} password
 * @param  {string} name
 * @param  {string} email
 * @param  {string} role
 * @return {Promise}
 */
export function add(data) {
  return request({
    url: '/user/add',
    method: 'post',
    data
  })
}

export function edit(data) {
  return request({
    url: '/user/edit',
    method: 'post',
    data
  })
}

export function remove(id) {
  return request({
    url: '/user/remove',
    method: 'delete',
    data: { id }
  })
}

export function changePassword(oldPwd, newPwd) {
  return request({
    url: '/user/changePassword',
    method: 'post',
    data: {
      oldPwd,
      newPwd
    }
  })
}
