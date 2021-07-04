import { when } from "jest-when";
import { DynamicFragment, PathFragment, Route, Routes, StaticFragment } from "../../src/router/router";


describe("Route", () => {
  describe("#score", () => {
    test("multiply each fratment score", () => {
      const f1 = {} as PathFragment;
      const s1 = jest.fn();
      when(s1).calledWith('users').mockReturnValueOnce(2);
      f1.score = s1;

      const f2 = {} as PathFragment;
      const s2 = jest.fn();
      when(s2).calledWith('1').mockReturnValue(1);
      f2.score = s2;

      const target = new Route('', [f1, f2]);
      expect(target.score('/users/1')).toEqual(2);
    });

    test("zero when size is not match", () => {
      const f1 = {} as PathFragment;

      const target = new Route('', [f1]);
      expect(target.score('/users/1')).toEqual(0);
    })
  });

  describe("#asResult", () => {
    test("static fragment only", () => {
      expect(new Route('aaaa', [new StaticFragment('users')]).asResult('/users')).toEqual({ component: 'aaaa', parameter: {} })
    });

    test('dynamic fragment', () => {
      expect(new Route('aaaa', [new StaticFragment('users'), new DynamicFragment(':id')]).asResult('/users/1111')).toEqual({ component: 'aaaa', parameter: {'id': '1111'} })
    })
  })
})


describe("Routes", () => {
  describe("#match", () => {
    test("get highest score route", () => {
      const r1 = {} as Route;
      const score1 = jest.fn();
      when(score1).calledWith('/user/1').mockReturnValueOnce(1)
      r1.score = score1;
      const r2 = {} as Route;
      const score2 = jest.fn();
      when(score2).calledWith('/user/1').mockReturnValueOnce(10);
      r2.score = score2;
      expect(new Routes([r1, r2]).match('/user/1')).toEqual(r2);
    })

    test("get default route when no positive score route is available", () => {
      const r1 = {} as Route;
      const score1 = jest.fn();
      when(score1).calledWith('/user/1').mockReturnValueOnce(0)
      r1.score = score1;
      const r2 = {} as Route;
      const score2 = jest.fn();
      when(score2).calledWith('/user/1').mockReturnValueOnce(0);
      r2.score = score2;
      const defaultR = {} as Route
      expect(new Routes([r1, r2], defaultR).match('/user/1')).toEqual(defaultR);
    })
  });
})