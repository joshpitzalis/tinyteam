/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type CreateOrganisationInput = {
  id?: string | null,
  name: string,
};

export type UpdateOrganisationInput = {
  id: string,
  name?: string | null,
};

export type DeleteOrganisationInput = {
  id?: string | null,
};

export type CreateProjectInput = {
  id?: string | null,
  name: string,
  projectOrganisationId?: string | null,
};

export type UpdateProjectInput = {
  id: string,
  name?: string | null,
  projectOrganisationId?: string | null,
};

export type DeleteProjectInput = {
  id?: string | null,
};

export type CreateListInput = {
  id?: string | null,
  title: string,
  listProjectId?: string | null,
};

export type UpdateListInput = {
  id: string,
  title?: string | null,
  listProjectId?: string | null,
};

export type DeleteListInput = {
  id?: string | null,
};

export type CreateTodoInput = {
  id?: string | null,
  content?: string | null,
  todoListId?: string | null,
};

export type UpdateTodoInput = {
  id: string,
  content?: string | null,
  todoListId?: string | null,
};

export type DeleteTodoInput = {
  id?: string | null,
};

export type ModelOrganisationFilterInput = {
  id?: ModelIDFilterInput | null,
  name?: ModelStringFilterInput | null,
  and?: Array< ModelOrganisationFilterInput | null > | null,
  or?: Array< ModelOrganisationFilterInput | null > | null,
  not?: ModelOrganisationFilterInput | null,
};

export type ModelIDFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelStringFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelProjectFilterInput = {
  id?: ModelIDFilterInput | null,
  name?: ModelStringFilterInput | null,
  and?: Array< ModelProjectFilterInput | null > | null,
  or?: Array< ModelProjectFilterInput | null > | null,
  not?: ModelProjectFilterInput | null,
};

export type ModelListFilterInput = {
  id?: ModelIDFilterInput | null,
  title?: ModelStringFilterInput | null,
  and?: Array< ModelListFilterInput | null > | null,
  or?: Array< ModelListFilterInput | null > | null,
  not?: ModelListFilterInput | null,
};

export type ModelTodoFilterInput = {
  id?: ModelIDFilterInput | null,
  content?: ModelStringFilterInput | null,
  and?: Array< ModelTodoFilterInput | null > | null,
  or?: Array< ModelTodoFilterInput | null > | null,
  not?: ModelTodoFilterInput | null,
};

export type CreateOrganisationMutationVariables = {
  input: CreateOrganisationInput,
};

export type CreateOrganisationMutation = {
  createOrganisation:  {
    __typename: "Organisation",
    id: string,
    name: string,
    projects:  {
      __typename: "ModelProjectConnection",
      items:  Array< {
        __typename: "Project",
        id: string,
        name: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type UpdateOrganisationMutationVariables = {
  input: UpdateOrganisationInput,
};

export type UpdateOrganisationMutation = {
  updateOrganisation:  {
    __typename: "Organisation",
    id: string,
    name: string,
    projects:  {
      __typename: "ModelProjectConnection",
      items:  Array< {
        __typename: "Project",
        id: string,
        name: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type DeleteOrganisationMutationVariables = {
  input: DeleteOrganisationInput,
};

export type DeleteOrganisationMutation = {
  deleteOrganisation:  {
    __typename: "Organisation",
    id: string,
    name: string,
    projects:  {
      __typename: "ModelProjectConnection",
      items:  Array< {
        __typename: "Project",
        id: string,
        name: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type CreateProjectMutationVariables = {
  input: CreateProjectInput,
};

export type CreateProjectMutation = {
  createProject:  {
    __typename: "Project",
    id: string,
    name: string,
    organisation:  {
      __typename: "Organisation",
      id: string,
      name: string,
      projects:  {
        __typename: "ModelProjectConnection",
        nextToken: string | null,
      } | null,
    } | null,
    list:  {
      __typename: "ModelListConnection",
      items:  Array< {
        __typename: "List",
        id: string,
        title: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type UpdateProjectMutationVariables = {
  input: UpdateProjectInput,
};

export type UpdateProjectMutation = {
  updateProject:  {
    __typename: "Project",
    id: string,
    name: string,
    organisation:  {
      __typename: "Organisation",
      id: string,
      name: string,
      projects:  {
        __typename: "ModelProjectConnection",
        nextToken: string | null,
      } | null,
    } | null,
    list:  {
      __typename: "ModelListConnection",
      items:  Array< {
        __typename: "List",
        id: string,
        title: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type DeleteProjectMutationVariables = {
  input: DeleteProjectInput,
};

export type DeleteProjectMutation = {
  deleteProject:  {
    __typename: "Project",
    id: string,
    name: string,
    organisation:  {
      __typename: "Organisation",
      id: string,
      name: string,
      projects:  {
        __typename: "ModelProjectConnection",
        nextToken: string | null,
      } | null,
    } | null,
    list:  {
      __typename: "ModelListConnection",
      items:  Array< {
        __typename: "List",
        id: string,
        title: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type CreateListMutationVariables = {
  input: CreateListInput,
};

export type CreateListMutation = {
  createList:  {
    __typename: "List",
    id: string,
    title: string,
    project:  {
      __typename: "Project",
      id: string,
      name: string,
      organisation:  {
        __typename: "Organisation",
        id: string,
        name: string,
      } | null,
      list:  {
        __typename: "ModelListConnection",
        nextToken: string | null,
      } | null,
    } | null,
    Todos:  {
      __typename: "ModelTodoConnection",
      items:  Array< {
        __typename: "Todo",
        id: string,
        content: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type UpdateListMutationVariables = {
  input: UpdateListInput,
};

export type UpdateListMutation = {
  updateList:  {
    __typename: "List",
    id: string,
    title: string,
    project:  {
      __typename: "Project",
      id: string,
      name: string,
      organisation:  {
        __typename: "Organisation",
        id: string,
        name: string,
      } | null,
      list:  {
        __typename: "ModelListConnection",
        nextToken: string | null,
      } | null,
    } | null,
    Todos:  {
      __typename: "ModelTodoConnection",
      items:  Array< {
        __typename: "Todo",
        id: string,
        content: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type DeleteListMutationVariables = {
  input: DeleteListInput,
};

export type DeleteListMutation = {
  deleteList:  {
    __typename: "List",
    id: string,
    title: string,
    project:  {
      __typename: "Project",
      id: string,
      name: string,
      organisation:  {
        __typename: "Organisation",
        id: string,
        name: string,
      } | null,
      list:  {
        __typename: "ModelListConnection",
        nextToken: string | null,
      } | null,
    } | null,
    Todos:  {
      __typename: "ModelTodoConnection",
      items:  Array< {
        __typename: "Todo",
        id: string,
        content: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type CreateTodoMutationVariables = {
  input: CreateTodoInput,
};

export type CreateTodoMutation = {
  createTodo:  {
    __typename: "Todo",
    id: string,
    content: string | null,
    List:  {
      __typename: "List",
      id: string,
      title: string,
      project:  {
        __typename: "Project",
        id: string,
        name: string,
      } | null,
      Todos:  {
        __typename: "ModelTodoConnection",
        nextToken: string | null,
      } | null,
    } | null,
  } | null,
};

export type UpdateTodoMutationVariables = {
  input: UpdateTodoInput,
};

export type UpdateTodoMutation = {
  updateTodo:  {
    __typename: "Todo",
    id: string,
    content: string | null,
    List:  {
      __typename: "List",
      id: string,
      title: string,
      project:  {
        __typename: "Project",
        id: string,
        name: string,
      } | null,
      Todos:  {
        __typename: "ModelTodoConnection",
        nextToken: string | null,
      } | null,
    } | null,
  } | null,
};

export type DeleteTodoMutationVariables = {
  input: DeleteTodoInput,
};

export type DeleteTodoMutation = {
  deleteTodo:  {
    __typename: "Todo",
    id: string,
    content: string | null,
    List:  {
      __typename: "List",
      id: string,
      title: string,
      project:  {
        __typename: "Project",
        id: string,
        name: string,
      } | null,
      Todos:  {
        __typename: "ModelTodoConnection",
        nextToken: string | null,
      } | null,
    } | null,
  } | null,
};

export type GetOrganisationQueryVariables = {
  id: string,
};

export type GetOrganisationQuery = {
  getOrganisation:  {
    __typename: "Organisation",
    id: string,
    name: string,
    projects:  {
      __typename: "ModelProjectConnection",
      items:  Array< {
        __typename: "Project",
        id: string,
        name: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type ListOrganisationsQueryVariables = {
  filter?: ModelOrganisationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListOrganisationsQuery = {
  listOrganisations:  {
    __typename: "ModelOrganisationConnection",
    items:  Array< {
      __typename: "Organisation",
      id: string,
      name: string,
      projects:  {
        __typename: "ModelProjectConnection",
        nextToken: string | null,
      } | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetProjectQueryVariables = {
  id: string,
};

export type GetProjectQuery = {
  getProject:  {
    __typename: "Project",
    id: string,
    name: string,
    organisation:  {
      __typename: "Organisation",
      id: string,
      name: string,
      projects:  {
        __typename: "ModelProjectConnection",
        nextToken: string | null,
      } | null,
    } | null,
    list:  {
      __typename: "ModelListConnection",
      items:  Array< {
        __typename: "List",
        id: string,
        title: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type ListProjectsQueryVariables = {
  filter?: ModelProjectFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListProjectsQuery = {
  listProjects:  {
    __typename: "ModelProjectConnection",
    items:  Array< {
      __typename: "Project",
      id: string,
      name: string,
      organisation:  {
        __typename: "Organisation",
        id: string,
        name: string,
      } | null,
      list:  {
        __typename: "ModelListConnection",
        nextToken: string | null,
      } | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetListQueryVariables = {
  id: string,
};

export type GetListQuery = {
  getList:  {
    __typename: "List",
    id: string,
    title: string,
    project:  {
      __typename: "Project",
      id: string,
      name: string,
      organisation:  {
        __typename: "Organisation",
        id: string,
        name: string,
      } | null,
      list:  {
        __typename: "ModelListConnection",
        nextToken: string | null,
      } | null,
    } | null,
    Todos:  {
      __typename: "ModelTodoConnection",
      items:  Array< {
        __typename: "Todo",
        id: string,
        content: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type ListListsQueryVariables = {
  filter?: ModelListFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListListsQuery = {
  listLists:  {
    __typename: "ModelListConnection",
    items:  Array< {
      __typename: "List",
      id: string,
      title: string,
      project:  {
        __typename: "Project",
        id: string,
        name: string,
      } | null,
      Todos:  {
        __typename: "ModelTodoConnection",
        nextToken: string | null,
      } | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetTodoQueryVariables = {
  id: string,
};

export type GetTodoQuery = {
  getTodo:  {
    __typename: "Todo",
    id: string,
    content: string | null,
    List:  {
      __typename: "List",
      id: string,
      title: string,
      project:  {
        __typename: "Project",
        id: string,
        name: string,
      } | null,
      Todos:  {
        __typename: "ModelTodoConnection",
        nextToken: string | null,
      } | null,
    } | null,
  } | null,
};

export type ListTodosQueryVariables = {
  filter?: ModelTodoFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTodosQuery = {
  listTodos:  {
    __typename: "ModelTodoConnection",
    items:  Array< {
      __typename: "Todo",
      id: string,
      content: string | null,
      List:  {
        __typename: "List",
        id: string,
        title: string,
      } | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateOrganisationSubscription = {
  onCreateOrganisation:  {
    __typename: "Organisation",
    id: string,
    name: string,
    projects:  {
      __typename: "ModelProjectConnection",
      items:  Array< {
        __typename: "Project",
        id: string,
        name: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnUpdateOrganisationSubscription = {
  onUpdateOrganisation:  {
    __typename: "Organisation",
    id: string,
    name: string,
    projects:  {
      __typename: "ModelProjectConnection",
      items:  Array< {
        __typename: "Project",
        id: string,
        name: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnDeleteOrganisationSubscription = {
  onDeleteOrganisation:  {
    __typename: "Organisation",
    id: string,
    name: string,
    projects:  {
      __typename: "ModelProjectConnection",
      items:  Array< {
        __typename: "Project",
        id: string,
        name: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnCreateProjectSubscription = {
  onCreateProject:  {
    __typename: "Project",
    id: string,
    name: string,
    organisation:  {
      __typename: "Organisation",
      id: string,
      name: string,
      projects:  {
        __typename: "ModelProjectConnection",
        nextToken: string | null,
      } | null,
    } | null,
    list:  {
      __typename: "ModelListConnection",
      items:  Array< {
        __typename: "List",
        id: string,
        title: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnUpdateProjectSubscription = {
  onUpdateProject:  {
    __typename: "Project",
    id: string,
    name: string,
    organisation:  {
      __typename: "Organisation",
      id: string,
      name: string,
      projects:  {
        __typename: "ModelProjectConnection",
        nextToken: string | null,
      } | null,
    } | null,
    list:  {
      __typename: "ModelListConnection",
      items:  Array< {
        __typename: "List",
        id: string,
        title: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnDeleteProjectSubscription = {
  onDeleteProject:  {
    __typename: "Project",
    id: string,
    name: string,
    organisation:  {
      __typename: "Organisation",
      id: string,
      name: string,
      projects:  {
        __typename: "ModelProjectConnection",
        nextToken: string | null,
      } | null,
    } | null,
    list:  {
      __typename: "ModelListConnection",
      items:  Array< {
        __typename: "List",
        id: string,
        title: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnCreateListSubscription = {
  onCreateList:  {
    __typename: "List",
    id: string,
    title: string,
    project:  {
      __typename: "Project",
      id: string,
      name: string,
      organisation:  {
        __typename: "Organisation",
        id: string,
        name: string,
      } | null,
      list:  {
        __typename: "ModelListConnection",
        nextToken: string | null,
      } | null,
    } | null,
    Todos:  {
      __typename: "ModelTodoConnection",
      items:  Array< {
        __typename: "Todo",
        id: string,
        content: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnUpdateListSubscription = {
  onUpdateList:  {
    __typename: "List",
    id: string,
    title: string,
    project:  {
      __typename: "Project",
      id: string,
      name: string,
      organisation:  {
        __typename: "Organisation",
        id: string,
        name: string,
      } | null,
      list:  {
        __typename: "ModelListConnection",
        nextToken: string | null,
      } | null,
    } | null,
    Todos:  {
      __typename: "ModelTodoConnection",
      items:  Array< {
        __typename: "Todo",
        id: string,
        content: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnDeleteListSubscription = {
  onDeleteList:  {
    __typename: "List",
    id: string,
    title: string,
    project:  {
      __typename: "Project",
      id: string,
      name: string,
      organisation:  {
        __typename: "Organisation",
        id: string,
        name: string,
      } | null,
      list:  {
        __typename: "ModelListConnection",
        nextToken: string | null,
      } | null,
    } | null,
    Todos:  {
      __typename: "ModelTodoConnection",
      items:  Array< {
        __typename: "Todo",
        id: string,
        content: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnCreateTodoSubscription = {
  onCreateTodo:  {
    __typename: "Todo",
    id: string,
    content: string | null,
    List:  {
      __typename: "List",
      id: string,
      title: string,
      project:  {
        __typename: "Project",
        id: string,
        name: string,
      } | null,
      Todos:  {
        __typename: "ModelTodoConnection",
        nextToken: string | null,
      } | null,
    } | null,
  } | null,
};

export type OnUpdateTodoSubscription = {
  onUpdateTodo:  {
    __typename: "Todo",
    id: string,
    content: string | null,
    List:  {
      __typename: "List",
      id: string,
      title: string,
      project:  {
        __typename: "Project",
        id: string,
        name: string,
      } | null,
      Todos:  {
        __typename: "ModelTodoConnection",
        nextToken: string | null,
      } | null,
    } | null,
  } | null,
};

export type OnDeleteTodoSubscription = {
  onDeleteTodo:  {
    __typename: "Todo",
    id: string,
    content: string | null,
    List:  {
      __typename: "List",
      id: string,
      title: string,
      project:  {
        __typename: "Project",
        id: string,
        name: string,
      } | null,
      Todos:  {
        __typename: "ModelTodoConnection",
        nextToken: string | null,
      } | null,
    } | null,
  } | null,
};
