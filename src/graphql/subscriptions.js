// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateOrganisation = `subscription OnCreateOrganisation {
  onCreateOrganisation {
    id
    name
    projects {
      items {
        id
        name
      }
      nextToken
    }
  }
}
`;
export const onUpdateOrganisation = `subscription OnUpdateOrganisation {
  onUpdateOrganisation {
    id
    name
    projects {
      items {
        id
        name
      }
      nextToken
    }
  }
}
`;
export const onDeleteOrganisation = `subscription OnDeleteOrganisation {
  onDeleteOrganisation {
    id
    name
    projects {
      items {
        id
        name
      }
      nextToken
    }
  }
}
`;
export const onCreateProject = `subscription OnCreateProject {
  onCreateProject {
    id
    name
    organisation {
      id
      name
      projects {
        nextToken
      }
    }
    list {
      items {
        id
        title
      }
      nextToken
    }
  }
}
`;
export const onUpdateProject = `subscription OnUpdateProject {
  onUpdateProject {
    id
    name
    organisation {
      id
      name
      projects {
        nextToken
      }
    }
    list {
      items {
        id
        title
      }
      nextToken
    }
  }
}
`;
export const onDeleteProject = `subscription OnDeleteProject {
  onDeleteProject {
    id
    name
    organisation {
      id
      name
      projects {
        nextToken
      }
    }
    list {
      items {
        id
        title
      }
      nextToken
    }
  }
}
`;
export const onCreateList = `subscription OnCreateList {
  onCreateList {
    id
    title
    project {
      id
      name
      organisation {
        id
        name
      }
      list {
        nextToken
      }
    }
    Todos {
      items {
        id
        content
      }
      nextToken
    }
  }
}
`;
export const onUpdateList = `subscription OnUpdateList {
  onUpdateList {
    id
    title
    project {
      id
      name
      organisation {
        id
        name
      }
      list {
        nextToken
      }
    }
    Todos {
      items {
        id
        content
      }
      nextToken
    }
  }
}
`;
export const onDeleteList = `subscription OnDeleteList {
  onDeleteList {
    id
    title
    project {
      id
      name
      organisation {
        id
        name
      }
      list {
        nextToken
      }
    }
    Todos {
      items {
        id
        content
      }
      nextToken
    }
  }
}
`;
export const onCreateTodo = `subscription OnCreateTodo {
  onCreateTodo {
    id
    content
    List {
      id
      title
      project {
        id
        name
      }
      Todos {
        nextToken
      }
    }
  }
}
`;
export const onUpdateTodo = `subscription OnUpdateTodo {
  onUpdateTodo {
    id
    content
    List {
      id
      title
      project {
        id
        name
      }
      Todos {
        nextToken
      }
    }
  }
}
`;
export const onDeleteTodo = `subscription OnDeleteTodo {
  onDeleteTodo {
    id
    content
    List {
      id
      title
      project {
        id
        name
      }
      Todos {
        nextToken
      }
    }
  }
}
`;
