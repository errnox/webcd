require 'rack'

require_relative 'webcd'


Rack::Handler::WEBrick.run Webcd::App, :Port => 3456
