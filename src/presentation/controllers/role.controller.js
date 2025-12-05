class RoleController {
  constructor(roleService) {
    this.roleService = roleService;
  }

  getAll = async (req, res, next) => {
    try {
      const roles = await this.roleService.getAllRoles();
      res.status(200).json(roles);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const role = await this.roleService.getRoleById(id);
      res.status(200).json(role);
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const role = await this.roleService.createRole(req.body);
      res.status(201).json(role);
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const role = await this.roleService.updateRole(id, req.body);
      res.status(200).json(role);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.roleService.deleteRole(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
module.exports = RoleController;
