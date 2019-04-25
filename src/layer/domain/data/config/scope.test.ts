import { scope } from './scope';
import { Config } from '../config';
import { URL, standardize } from '../../../../lib/url';

describe('Unit: layer/domain/data/config/scope', () => {
  describe('scope', () => {
    it('match', () => {
      assert.deepStrictEqual(
        JSON.stringify(scope(new Config({}), {
          orig: new URL(standardize('/')).pathname,
          dest: new URL(standardize('/')).pathname
        }).extract()),
        JSON.stringify(new Config({})));
      assert.deepStrictEqual(
        JSON.stringify(scope(new Config({}), {
          orig: new URL(standardize('/a')).pathname,
          dest: new URL(standardize('/a')).pathname
        }).extract()),
        JSON.stringify(new Config({})));
      assert.deepStrictEqual(
        JSON.stringify(scope(new Config({}), {
          orig: new URL(standardize('/a/')).pathname,
          dest: new URL(standardize('/a/')).pathname
        }).extract()),
        JSON.stringify(new Config({})));
      assert.deepStrictEqual(
        JSON.stringify(scope(new Config({}), {
          orig: new URL(standardize('/abc')).pathname,
          dest: new URL(standardize('/abc')).pathname
        }).extract()),
        JSON.stringify(new Config({})));
      assert.deepStrictEqual(
        JSON.stringify(scope(new Config({}), {
          orig: new URL(standardize('/abc/')).pathname,
          dest: new URL(standardize('/abc/')).pathname
        }).extract()),
        JSON.stringify(new Config({})));
      assert.deepStrictEqual(
        JSON.stringify(scope(new Config({}), {
          orig: new URL(standardize('/a/b/c.d')).pathname,
          dest: new URL(standardize('/a/b/c.d')).pathname
        }).extract()),
        JSON.stringify(new Config({})));
    });

    it('mismatch', () => {
      assert.deepStrictEqual(
        JSON.stringify(scope(new Config({ scope: { '/a': {} } }), {
          orig: new URL(standardize('/')).pathname,
          dest: new URL(standardize('/a')).pathname
        }).extract(() => [])),
        JSON.stringify([]));
      assert.deepStrictEqual(
        JSON.stringify(scope(new Config({ scope: { '/a': {} } }), {
          orig: new URL(standardize('/a')).pathname,
          dest: new URL(standardize('/')).pathname
        }).extract(() => [])),
        JSON.stringify([]));
    });

    it('extend', () => {
      assert.deepStrictEqual(
        JSON.stringify(scope(new Config({ scope: { '/': { fetch: { wait: 100 } } } }), {
          orig: new URL(standardize('/')).pathname,
          dest: new URL(standardize('/')).pathname
        }).extract()),
        JSON.stringify(new Config({ fetch: { wait: 100 }, scope: { '/': { fetch: { wait: 100 } } } })));
    });

    it('disable', () => {
      assert.deepStrictEqual(
        JSON.stringify(scope(new Config({ scope: { '/': undefined } }), {
          orig: new URL(standardize('/')).pathname,
          dest: new URL(standardize('/')).pathname
        }).extract(() => ({}))),
        JSON.stringify({}));
    });

    it('enable', () => {
      assert.deepStrictEqual(
        JSON.stringify(scope(new Config({ scope: { '/': undefined, '/a': {} } }), {
          orig: new URL(standardize('/a')).pathname,
          dest: new URL(standardize('/a')).pathname
        }).extract()),
        JSON.stringify(new Config({ scope: { '/': undefined, '/a': {} } })));
    });

  });

});
