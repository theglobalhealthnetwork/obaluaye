import { IGroup, IFilters, IGroupInvitation, IGroupRole, IRoleType, IMsg  } from "@/interfaces"
import { apiCore } from "./core"

export const apiGroup = {
    async getSearch(payload: IFilters = {}) {
        return await useFetch<IGroup[]>(`${apiCore.url()}/group/search`, 
            {
                query: payload,
            }
        )
    },
    async getSearchTerm(key: string) {
        return await useFetch<IGroup>(`${apiCore.url()}/group/search/${key}`)
    },
    async getMulti(token: string, payload: IFilters = {}) {
        return await useFetch<IGroup[]>(`${apiCore.url()}/group/`, 
            {
                headers: apiCore.headers(token),
                query: payload,
            }
        )
    },
    async getFeaturedMulti(payload: IFilters = {}) {
        return await useFetch<IGroup[]>(`${apiCore.url()}/group/featured`, 
            {
                query: payload,
            }
        )
    },
    async getTerm(token: string, key: string) {
        return await useFetch<IGroup>(`${apiCore.url()}/group/${key}`, 
            {
                headers: apiCore.headers(token),
            }
        )
    },
    async createTerm(token: string, key: string, payload: IGroup) {
        return await useFetch<IMsg>(`${apiCore.url()}/group/${key}`, 
            {
                method: "POST",
                body: payload,
                headers: apiCore.headers(token),
            }
        )
    },
    async updateTerm(token: string, key: string, payload: IGroup) {
        return await useFetch<IMsg>(`${apiCore.url()}/group/${key}`, 
            {
                method: "PUT",
                body: payload,
                headers: apiCore.headers(token),
            }
        )
    },
    async removeTerm(token: string, key: string) {
        return await useFetch<IMsg>(`${apiCore.url()}/group/${key}`, 
            {
                method: "DELETE",
                headers: apiCore.headers(token),
            }
        )
    },
    // TOGGLES
    async toggleTermCompleted(token: string, key: string) {
        return await useFetch<IMsg>(`${apiCore.url()}/group/${key}/completed`, 
            {
                method: "PUT",
                headers: apiCore.headers(token),
            }
        )
    },
    async toggleTermFeatured(token: string, key: string) {
        return await useFetch<IMsg>(`${apiCore.url()}/group/${key}/featured`, 
            {
                method: "PUT",
                headers: apiCore.headers(token),
            }
        )
    },
    // MANAGE GROUP MEMBERS
    async getAllMembers(token: string, key: string, payload: IFilters = {}) {
        return await useFetch<IGroupRole[]>(`${apiCore.url()}/group/${key}/members`, 
            {
                headers: apiCore.headers(token),
                query: payload,
            }
        )
    },
    async updateMember(token: string, key: string, member_key: string, role_type: IRoleType, payload: IFilters = {}) {
        return await useFetch<IGroupRole[]>(`${apiCore.url()}/group/${key}/members/${member_key}/${role_type}`, 
            {
                method: "POST",
                headers: apiCore.headers(token),
                query: payload,
            }
        )
    },
    async removeMember(token: string, key: string, member_key: string, payload: IFilters = {}) {
        return await useFetch<IGroupRole[]>(`${apiCore.url()}/group/${key}/members/${member_key}`, 
            {
                method: "DELETE",
                headers: apiCore.headers(token),
                query: payload,
            }
        )
    },
    async getAllInvitations(token: string, key: string, payload: IFilters = {}) {
        return await useFetch<IGroupInvitation[]>(`${apiCore.url()}/group/${key}/invitations`, 
            {
                headers: apiCore.headers(token),
                query: payload,
            }
        )
    },
    async createInvitation(token: string, key: string, email: string, payload: IFilters = {}) {
        return await useFetch<IGroupInvitation[]>(`${apiCore.url()}/group/${key}/invitations/${email}`, 
            {
                method: "POST",
                headers: apiCore.headers(token),
                query: payload,
            }
        )
    },
    async removeInvitation(token: string, key: string, invitation_key: string, payload: IFilters = {}) {
        return await useFetch<IGroupInvitation[]>(`${apiCore.url()}/group/${key}/invitations/${invitation_key}`, 
            {
                method: "DELETE",
                headers: apiCore.headers(token),
                query: payload,
            }
        )
    },
}