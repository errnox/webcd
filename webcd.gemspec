# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'webcd/version'

Gem::Specification.new do |spec|
  spec.name          = "webcd"
  spec.version       = Webcd::VERSION
  spec.authors       = ["<username>"]
  spec.email         = ["<username>"]
  spec.summary       = 'Like "cd", but in your web browser'
  spec.description   = "webcd lets you roam around your file system from \
within your web browser."
  spec.homepage      = ""
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0")
  spec.executables   = spec.files.grep(%r{^bin/}) { |f| File.basename(f) }
  spec.test_files    = spec.files.grep(%r{^(test|spec|features)/})
  spec.require_paths = ["lib"]

  spec.add_development_dependency "bundler", "~> 1.7"
  spec.add_development_dependency "rake", "~> 10.0"
end
