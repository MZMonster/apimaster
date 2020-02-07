
describe('ModelService', () => {
  let admin;
  let site;
  let toSite;
  let ship;
  let container;
  let component;

  before(() => {
    return Admin.create({
      username: 'whatever',
      email: 'xxx@meizu.com',
    }).then(_admin => {
      admin = _admin;
      return Site.create([{
        title: 'test1',
        domain: Date.now(),
        createBy: admin.id,
      }, {
        title: 'test2',
        domain: Date.now() + 846,
        createBy: admin.id,
      },
      ]);
    }).then(_sites => {
      site = _sites[0];
      toSite = _sites[1];
      return Ship.create({
        domain: Date.now(),
        title: 'testship1',
        site: site.id,
        createBy: admin.id,
      });
    }).then(_ship => {
      ship = _ship;
      return Container.create({
        title: 'containerlalala',
        site,
        ship,
        createBy: admin,
      });
    }).then(_con => {
      container = _con;
      return Component.create({
        title: 'componentlalala',
        site,
        container,
        createBy: admin,
      });
    }).then(_cmpt => {
      component = _cmpt;
    });
  });

  describe('#copyAcrossSite', () => {
    it('copyship success', () => {
      let sessionSites = [site.id, toSite.id];
      let options = {
        uuid: ship.uuid,
        toSite: toSite.id,
      };
      return ModelService.copyAcrossSite(admin, sessionSites, Ship, options);
    });

    it('copyship with error1', () => {
      let sessionSites = [toSite.id];
      let options = {
        uuid: ship.uuid,
        toSite: toSite.id,
      };
      return ModelService.copyAcrossSite(admin, sessionSites, Ship, options)
        .should.be.rejectedWith('You are not the manager of the origin site!');
    });

    it('copyship with error2', () => {
      let sessionSites = [site.id];
      let options = {
        uuid: ship.uuid,
        toSite: toSite.id,
      };
      return ModelService.copyAcrossSite(admin, sessionSites, Ship, options)
        .should.be.rejectedWith('You are not the manager of the target site!');
    });

    it('copyship with error - params missing', () => {
      let sessionSites = [site.id, toSite.id];
      let options = {
        uuid: ship.uuid,
      };
      return ModelService.copyAcrossSite(admin, sessionSites, Ship, options)
        .should.be.rejectedWith('Params missing');
    });

    it('copyship with error - data not found', () => {
      let sessionSites = [site.id, toSite.id];
      let options = {
        uuid: 'lalalalaladadadada',
        toSite: toSite.id,
      };
      return ModelService.copyAcrossSite(admin, sessionSites, Ship, options)
        .should.be.rejectedWith('Data not found');
    });
  });
});
