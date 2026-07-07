import { IconService } from './icon.service';

describe('IconService', () => {
  let service: IconService;

  const MOCK_ICONS = [
    { name: 'alarm' },
    { name: 'arrow-up' },
    { name: 'bootstrap' },
  ];

  beforeEach(() => {
    service = new IconService();
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('icons signal', () => {
    it('should return null initially', () => {
      expect(service.icons()).toBeNull();
    });
  });

  describe('getIconsSync()', () => {
    it('should return empty array when icons not loaded', () => {
      expect(service.getIconsSync()).toEqual([]);
    });

    it('should return icons after loading', (done) => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => MOCK_ICONS,
      });

      service.loadIcons().subscribe(() => {
        expect(service.getIconsSync()).toEqual([
          'alarm',
          'arrow-up',
          'bootstrap',
        ]);
        done();
      });
    });
  });

  describe('loadIcons()', () => {
    it('should make fetch request and map icon names', (done) => {
      const fetchMock = (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => MOCK_ICONS,
      });

      service.loadIcons().subscribe((icons) => {
        expect(icons).toEqual(['alarm', 'arrow-up', 'bootstrap']);
        expect(fetchMock).toHaveBeenCalledWith(
          'https://raw.githubusercontent.com/twbs/icons/main/bootstrap-icons.json'
        );
        done();
      });
    });

    it('should cache icons and not re-request on second call', (done) => {
      const fetchMock = (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => MOCK_ICONS,
      });

      service.loadIcons().subscribe(() => {
        expect(fetchMock).toHaveBeenCalledTimes(1);

        service.loadIcons().subscribe((icons) => {
          expect(icons).toEqual(['alarm', 'arrow-up', 'bootstrap']);
          expect(fetchMock).toHaveBeenCalledTimes(1);
          done();
        });
      });
    });

    it('should handle HTTP error gracefully and return empty array', (done) => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 500,
      });

      service.loadIcons().subscribe((icons) => {
        expect(icons).toEqual([]);
        done();
      });
    });

    it('should set icons signal to empty array on error', (done) => {
      (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

      service.loadIcons().subscribe(() => {
        expect(service.icons()).toEqual([]);
        done();
      });
    });

    it('should set icons signal after successful load', (done) => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => MOCK_ICONS,
      });

      service.loadIcons().subscribe(() => {
        expect(service.icons()).toEqual(['alarm', 'arrow-up', 'bootstrap']);
        done();
      });
    });
  });
});
